const mongoose = require("mongoose");
// Privacy settings model has 1 to 1 relation with the user 
//For normalization purposes it will be added to the user model
const userSchema = new mongoose.Schema(
    {
    name:{type: String, required: true, minlength: 3, maxlength: 30},
    email:{type: String, required: true, minlength: 3, maxlength: 100, unique:true},
    password:{type: String, required: true, minlength: 3, maxlength: 200},
    username:{type: String, required: true, minlength: 3, maxlength: 30},
    profileImage:{type: String, required: false, minlength: 3, maxlength: 30},
    about:{type: String, required: false, minlength: 3, maxlength: 30},
    status:{type: String, required: false, minlength: 3, maxlength: 30},
    blockedUsers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    //Privacy settings
    showProfileImage:{type: Boolean, required: false, default: true},
    showAboutSection:{type:Boolean,reqired: false, default: true}

},
    {timestamps:true}
);

const userModel = mongoose.model("User", userSchema)

module.exports = userModel