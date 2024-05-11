require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const connection = require("./config/connection");
const TicTacToeModel = require("./models/app.model");
const app = express();

app.use(
    cors({
        origin: [process.env.ORIGIN, process.env.ORIGIN_GLOBAL],
        methods: ["GET", "POST", "PUT"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: { origin: [process.env.ORIGIN, process.env.ORIGIN_GLOBAL], methods: ["GET", "POST", "PUT"], },
});

app.use("/room", require("./routes/route.app"));
app.use("/refresh", require("./utils/verifyToken"));

cron.schedule("*/5 * * * *", async () => {
    console.log("Cron job started");
    try {
        const result = await TicTacToeModel.deleteMany({});
        console.log("Deletion result:", result);
    } catch (err) {
        console.error("Error deleting documents:", err);
    }
    console.log("Cron job completed");
});



io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("user-clicks", (data) => {
        const { roomID, index, value, turn } = data;
        console.log(data);
        io.emit(`${roomID}`, {
            roomID: roomID,
            index: index,
            value: value,
            turnn: turn == "X" ? "O" : "X",
        });
    });

    socket.on("reset", (data) => {
        const { roomID, turn } = data;
        io.emit(`${roomID}reset`, { message: "Reset" });
    });

    socket.on("turn-change", (data) => {
        const { roomID, turn } = data;
        io.emit(`${roomID}turn-change`, { message: "Change Turn" });
    });
});
connection().then(() => {
    server.listen(process.env.PORT, () => {
        console.log("server running at", process.env.PORT, process.env.ORIGIN_GLOBAL);
    });
});
