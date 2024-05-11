import React, { useEffect, useState } from "react";
import "./userjoin.css";
import { ApiRequest } from "../api/apiCall";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify";
const UserJoin = () => {
  const [roomID, setRoomID] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (roomID?.length != 4) return;
    setLoad(true);
    const { data, status, message } = await ApiRequest(
      "PUT",
      `${process.env.REACT_APP_BASE_URI}room/joinRoom`,
      { roomID: roomID },
      null
    );

    if (status === 200) {
      localStorage.removeItem("state");
      localStorage.setItem("who", "O");
      navigate("/play", { state: { roomID: data?.roomID, turn: "O" } });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoad(false);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="usercreateContainer">
      <input
        type="number"
        name=""
        id=""
        className="inputHolder"
        placeholder="Enter Room id"
        minLength={4}
        maxLength={4}
        onChange={(e) => {
          setRoomID(e.target.value);
        }}
      />
      <button className="btnHolder" onClick={() => handleSubmit()}>
        {load ? <img src={loader} alt="" height={20} width={20} /> : "Join"}
      </button>
    </div>
  );
};

export default UserJoin;
