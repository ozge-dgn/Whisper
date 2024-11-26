const messageModel = require("../Models/messageModel")

const createMessage = async(req,res) =>{
    const {roomId,senderId,content} = req.body

    const message = new messageModel({roomId,senderId,content
    });

    try{
        const response = await message.save()

        res.status(200).json(response);
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
};

const getMessages = async(req,res) =>{
    
    const {roomId} = req.params

    try{

        const messages = await messageModel.find({roomId})

        res.status(200).json(messages);
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
};

module.exports = {createMessage,getMessages}