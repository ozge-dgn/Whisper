const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
    type:{type: String, required: true, minlength: 3, maxlength: 30},
    content:{type: String, required: true, minlength: 1, maxlength: 400, unique:true},
    sender:{type: String, required: true, minlength: 1, maxlength: 200},
    status:{type: String, required: true, minlength: 3, maxlength: 30},
    reactions:{type: String, required: false, minlength: 3, maxlength: 30}

},
    {timestamps:true}
);

const messageModel = mongoose.model("Message", messageSchema)

module.exports = messageModel