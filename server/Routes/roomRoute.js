const express = require("express")
const { createPrivateRoom, createGroupRoom, getUserRooms, findRoom } = require("../Controller/roomController")

const router = express.Router();

//TODO decide how to handle group and private room creation
router.post("/",createPrivateRoom);
//router.post("/",createGroupRoom);
router.get("/:userId",getUserRooms);
router.get("/find/:firstId/:secondId",findRoom);

module.exports = router