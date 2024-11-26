const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator")
const jwt = require("jsonwebtoken")

//Create a jwt token
const createToken = (_id)=>{
    const jwt_key = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwt_key,{expiresIn: "1d"})
};

const registerUser = async(req,res) =>{

    try{
        const {name,email,password,username} = req.body;

        //Find if a user with the same email exists
        let user = await userModel.findOne({email});

        //Check for existing user with same email
        if(user) return res.status(400).json("User already exists")

        //Find if a user with same username exists
        user = await userModel.findOne({username});

        //Check for existing user with same username
        if(user) return res.status(400).json("Username already in use")

        //Check if user is trying to register with empty fields
        if(!name || !email || !password || !username) return res.status(400).json("No empty fields allowed")

        //Check if typed email is valid
        if(!validator.isEmail(email)) return res.status(400).json("Not a valid email address")

        //Check if typed password is a strong password
        //At least one lower case character
        //At least one upper case character
        //At least one special character
        //At least one number
        if(!validator.isStrongPassword(password)) return res.status(400).json("Not a strong password")    

        //If register request passes all checks
        //Create new user
        user = new userModel({name,email,password,username});

        //Generates a random string of 10 characters for hashing the password and hash
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id)

        return res.status(200).json({_id:user._id, name, email, username, token})
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }

};

const loginUser = async(req,res) => {

    const {email,password} = req.body;

    try{

        let user = await userModel.findOne({email})

        if(!user) return res.status(400).json("Incorrect email or password")

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) return res.status(400).json("Incorrect email or password")

        const token = createToken(user._id)

        return res.status(200).json({_id:user._id, name: user.name, email, username: user.username, token})

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }

};

const findUser = async(req,res)=>{

    const userId = req.params.userId;
    try{

        const user = await userModel.findById(userId);

        return res.status(200).json(user);

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }

};

const getUsers = async(req,res)=>{

    try{

        const users = await userModel.find();

        return res.status(200).json(users);

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }

};

module.exports = {registerUser, loginUser,findUser, getUsers}