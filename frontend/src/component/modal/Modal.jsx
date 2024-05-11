import React from "react";
import "./modal.css";
const Modal = ({ handleRestart, message }) => {
  return (
    <div className="modalContainer">
      <div className="modalInfoContainer">
        <div>{message}</div>
        <div className="restartBtn" onClick={() => handleRestart()}>
          Play Again
        </div>
      </div>
    </div>
  );
};

export default Modal;
