const generateToken = require("../middleware/token");
const TicTacToeModel = require("../models/app.model");
const createRoom = async (req, res) => {
    try {
        const { roomID } = req.body;

        const roomFound = await TicTacToeModel.findOne({ roomID: roomID });

        if (roomFound) {
            return res.status(400).json({ message: "Room Already Exist" });
        }

        const create = new TicTacToeModel({
            roomID: roomID,
            userX: "Exist",
        });
        const result = await create.save();
        console.log("", result);
        const token = generateToken(result._id, "X", roomID);
        if (result) {
            res.status(200).json({
                message: "Room Created Successfully",
                token: token,
                roomID: roomID,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const joinRoom = async (req, res) => {
    try {
        const { roomID } = req.body;

        const roomFound = await TicTacToeModel.findOne({ roomID: roomID });

        if (roomFound && roomFound.userO == "none") {
            roomFound.userO = "Exist";
            const result = await roomFound.save();
            const token = generateToken(result._id, "O", roomID);
            if (result) {
                res.status(200).json({
                    message: "Room Joined Successfully",
                    token: token,
                    roomID: roomID,
                });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { createRoom, joinRoom };
