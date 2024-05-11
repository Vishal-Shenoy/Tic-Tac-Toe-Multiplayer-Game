const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const TicTacToeModel = require("../models/app.model");
const verifyToken = async (req, res) => {
    console.log("hello", req.headers);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            res.status(400).json({ message: "Unauthorized" });
        }
        console.log("", decoded);
        const userFound = await TicTacToeModel.findOne({ _id: decoded._id });
        if (userFound) {
            return res
                .status(200)
                .json({
                    message: "Authorized",
                    roomID: decoded?.roomID,
                    turn: decoded?.turn,
                });
        } else {
            return res.status(400).json({ message: "Room not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
router.route("/").get(verifyToken);
module.exports = router;
