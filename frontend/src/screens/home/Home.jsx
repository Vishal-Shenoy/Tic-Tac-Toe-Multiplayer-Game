import React from "react";
import "./home.css";
import { useNavigate, useNavigation } from "react-router-dom";
const Home = () => {
  const navigation = useNavigate();
  return (
    <div className="homeContainer">
      <div className="commonBtn" onClick={() => navigation("/createRoom")}>
        Create Room
      </div>
      <div className="commonBtn" onClick={() => navigation("/joinRoom")}>
        Join Room
      </div>
    </div>
  );
};

export default Home;
