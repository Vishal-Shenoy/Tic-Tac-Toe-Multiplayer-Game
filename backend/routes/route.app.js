const express = require("express");
const router = express.Router();
const controller = require("../controller/app.controller");
router.post("/createRoom", controller.createRoom);
router.put("/joinRoom", controller.joinRoom);
module.exports = router;