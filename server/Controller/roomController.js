const roomModel = require("../Models/roomModel")


//create room
//find users rooms
//find room

//req takes the ids
//private rooms will show the username of the other user in the room
const createPrivateRoom = async (req,res) =>{
    //Ids for the users
    const {firstId,secondId} = req.body

    try{
        //check if a private room with both ids already exists
        const room = await roomModel.findOne({
            participants: {$all: [firstId,secondId]},
            private:true
        })
        //If chat exists return the existing room
        if (room) return res.status(200).json(room)
        
        //create room
        const newRoom = new roomModel({
            participants: [firstId,secondId],
            private:true
        })

        const response = await newRoom.save();

        res.status(200).json(response);
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const createGroupRoom = async (req,res) =>{

}

//Get all rooms of a certain user
const getUserRooms = async(req,res) =>{
    const userId = req.params.userId
    try{

        const rooms = await roomModel.find({
            participants:{$in: userId}
        });

        res.status(200).json(rooms);

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//Find a specific room 
const findRoom = async(req,res) =>{
    const {firstId,secondId} = req.params
    try{

        const room = await roomModel.findOne({
            participants:{$all: [firstId,secondId]},
            private:true
        });

        res.status(200).json(room);

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {createGroupRoom,createPrivateRoom,getUserRooms,findRoom}