const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute")
const roomRoute = require("./Routes/roomRoute")
const messageRoute = require("./Routes/messageRoute")

const app = express();
require("dotenv").config()

app.use(express.json());
app.use(cors());
//API end points
app.use("/api/users",userRoute);
app.use("/api/rooms",roomRoute);
app.use("/api/messages",messageRoute)

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, (req,res) =>{
    console.log(`Server running on port: ${port}`);
});

//Connect to MongoDB
//Change ATLAS_URI in the .env file to connect correctly
mongoose.connect(uri, {})
    .then(()=> console.log("Connected to MongoDB"))
    .catch((error)=>console.log("MongoDB connection failed:",error.message));

//CRUD operations
//app.post   => CREATE
//app.get    => READ
//app.put    => UPDATE
//app.delete => DELETE

app.get('/hello',(req,res)=>{
    res.send("Whisper API")
});