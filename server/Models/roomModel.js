const mongoose = require("mongoose")

//Not in the diagram but added groupchat boolean to differentiate between group and private rooms
const roomSchema = new mongoose.Schema({
    participants: Array,
    private:{type:Boolean,required:true,default:true},
    roomName: {type:String, required:false},
    roomImage: {type:String, required:false}
},{
    timestamps: true
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;