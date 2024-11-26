const express = require("express")
const { createPrivateRoom, createGroupRoom, getUserRooms, findRoom } = require("../Controller/roomController")

const router = express.Router();

router.post("/",createPrivateRoom);
router.post("/",createGroupRoom);
router.get("/:userId",getUserRooms);
router.get("/find/:firstId/:secondId",findRoom);

module.exports = router