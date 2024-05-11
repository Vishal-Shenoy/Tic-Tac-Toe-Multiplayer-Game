import React, { useEffect, useState } from "react";
import "./usercreate.css";
import { ApiRequest } from "../api/apiCall";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify";
const UserCreate = () => {
  const [load, setLoad] = useState(false);

  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (roomID?.length != 4) return;
    setLoad(true);
    const { data, status, message } = await ApiRequest(
      "POST",
      `${process.env.REACT_APP_BASE_URI}room/createRoom`,
      { roomID: roomID },
      null
    );

    if (status === 200) {
      localStorage.removeItem("state");
      localStorage.setItem("who", "X");
      navigate("/play", { state: { roomID: data?.roomID, turn: "X" } });
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
  console.log(process.env.REACT_APP_BASE_URI);
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
      <button className="btnHolder" onClick={handleSubmit}>
        {load ? <img src={loader} alt="" height={20} width={20} /> : "Create"}
      </button>
    </div>
  );
};

export default UserCreate;
