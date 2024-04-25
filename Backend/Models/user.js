import mongoose from "mongoose";

const user = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
        max: 20
    },
    lastName:{
        type: String,
        require: true,
        max: 20
    },
    email:{
        type: String,
        require: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        max: 20
    },
    friends:{
        type: Array,
        default: []
    },
    picturePath:{
        type: String,
        default: ""
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    Impressions: Number
});

const User = mongoose.model("User",user);
export default User;