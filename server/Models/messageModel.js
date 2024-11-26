const mongoose = require("mongoose");
//Added cahtId
//TODO only implemented text messages so type, status and reactions do nothing for now
const messageSchema = new mongoose.Schema(
    {
    roomId:{type: String, required: true, minlength: 1, maxlength: 200},
    type:{type: String, required: false, minlength: 3, maxlength: 30},
    content:{type: String, required: true, minlength: 1, maxlength: 400, unique:true},
    senderId:{type: String, required: true, minlength: 1, maxlength: 200},
    status:{type: String, required: false, minlength: 3, maxlength: 30},
    reactions:{type: String, required: false, minlength: 3, maxlength: 30}

},
    {timestamps:true}
);

const messageModel = mongoose.model("Message", messageSchema)

module.exports = messageModel