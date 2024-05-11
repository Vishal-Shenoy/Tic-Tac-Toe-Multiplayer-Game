const jwt = require("jsonwebtoken");

const generateToken = (_id, turn, roomID) => {
    return jwt.sign({ _id: _id, turn: turn, roomID, roomID }, process.env.SECRET, {
        expiresIn: "1h",
    });
}

module.exports = generateToken;