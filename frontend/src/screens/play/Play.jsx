import { io, Socket } from "socket.io-client";
import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./play.css";
import Modal from "../../component/modal/Modal";
let boardData = [0, 0, 0, 0, 0, 0, 0, 0, 0],
  who,
  whichTurn;

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Play() {
  const location = useLocation();
  who = localStorage.getItem("who");
  whichTurn = localStorage.getItem("whichTurn") || "X";
  const [turn, setTurn] = useState(location?.state?.turn);
  // const [whichTurn, setWhichTurn] = useState(
  //   localStorage.getItem("whichTurn") || "X"
  // );
  const socket = io(process.env.REACT_APP_BASE_URI, { timeout: 10000 });
  const [detect, setDetect] = useState(false);
  const [won, setWon] = useState({ display: false, message: "" });
  const [check, setCheck] = useState(true);
  const [timer, setTimer] = useState(true);
  const [viewTimer, setViewTimer] = useState(0);
  let roomID = location?.state?.roomID;

  useEffect(() => {
    socket.on(`${roomID}`, (data) => {
      const { roomID, index, value, turn } = data;
      boardData[index] = value;
      setDetect((prev) => !prev);
      localStorage.setItem("state", JSON.stringify(boardData));
      localStorage.setItem("whichTurn", whichTurn == "X" ? "O" : "X");
      handleWin();
      whichTurn = whichTurn == "X" ? "O" : "X";
    });
  }, []);

  useEffect(() => {
    socket.on(`${roomID}reset`, (data) => {
      localStorage.setItem(
        "state",
        JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0])
      );
      boardData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      setDetect((prev) => !prev);
      who = who == "X" ? "O" : "X";
      localStorage.setItem("who", who);
      localStorage.setItem("whichTurn", "X");
      whichTurn = "X";
      setCheck(true);
      setWon({ display: false, message: "" });
    });
  }, []);

  useEffect(() => {
    boardData = JSON.parse(localStorage.getItem("state")) || [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    setDetect((prev) => !prev);
  }, []);

  useEffect(() => {
    socket.on(`${roomID}turn-change`, (data) => {
      setTurn((prev) => (prev == "X" ? "O" : "X"));
    });
  }, []);

  const handleUserClick = (index) => {
    // console.log(who, whichTurn);
    if (who == whichTurn && check) {
      socket.emit("user-clicks", {
        roomID: roomID,
        index: index,
        value: who,
        turn: who,
      });
    }
  };

  const handleRestart = () => {
    socket.emit("reset", { roomID: roomID, turn: turn });
    socket.emit("turn-change", { roomID: roomID });
  };

  const handleWin = () => {
    for (const element of win) {
      let [a, b, c] = element;
      if (
        boardData[a || b || c] != 0 &&
        boardData[a] === boardData[b] &&
        boardData[b] === boardData[c]
      ) {
        if (who == boardData[a]) {
          setWon({ display: true, message: "You Won a Game" });
        } else {
          setWon({ display: true, message: "You Lose a Game" });
        }
        setCheck(false);
      }
    }
    if (!boardData.includes(0)) {
      setWon({ display: true, message: "Game Draw" });
      setCheck(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="leftContainer">
        <div className="boardContainer">
          {boardData?.length > 0 &&
            boardData.map((item, index) => {
              return (
                <div
                  className="box"
                  id={item == "X" ? "square" : item === "O" ? "circle" : ""}
                  onClick={() => item == 0 && handleUserClick(index)}
                  key={index}
                >
                  {item != 0 && item}
                </div>
              );
            })}
        </div>
        <div id={who == "X" ? "Xturn" : "Oturn"} className="timerContainer">
          {!won.display && who == whichTurn && "Your Turn"}
        </div>
        {won.display && (
          <Modal handleRestart={handleRestart} message={won.message} />
        )}
      </div>
    </div>
  );
}

export default Play;
