const express = require("express");
const { createMessage, getMessages } = require("../Controller/messageController");

const router = express.Router();

router.post("/",createMessage);
router.get("/:roomId",getMessages);

module.exports = router;
