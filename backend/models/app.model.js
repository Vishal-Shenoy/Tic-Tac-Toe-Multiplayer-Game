const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        roomID: {
            type: String,
            required: true,
        },
        userX: {
            type: String,
            default: "none",
        },
        userO: {
            type: String,
            default: "none",
        },
    },
    { timestamps: true }
);

const TicTacToeModel = new mongoose.model("TicTacToeModel", Schema);
module.exports = TicTacToeModel;