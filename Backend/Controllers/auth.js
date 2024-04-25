import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req,res)=> {
    try{
        const {firstName,lastName,email,password,friends,picturePath,location,occupation,viewedProfile,Impressions} = req.body;

        const salt = await bcrypt.genSalt();
        const PasswordHash = await bcrypt.hash(password,salt);

        const NewUser = new User({firstName:firstName,
        lastName:lastName,
        email:email,
        password:PasswordHash,
        friends:friends,
        picturePath:picturePath,
        location:location,
        occupation:occupation,
        viewedProfile:Math.floor(Math.random() * 100) + 1,
        Impressions:Math.floor(Math.random() * 100) + 1});

        const AddedUser = await NewUser.save();
        res.status(200).json(AddedUser);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const findEmail = await User.findOne({email:email});

        if(!(findEmail))
        res.status(404).json({error:"User Not Found"});

        const comparator = await bcrypt.compare(password,findEmail.password);

        if(!(comparator))
        res.status(404).json({error:"Invalid User Credentials"});

        const token = jwt.sign({id:findEmail._id},process.env.JWT_SECRETKEY);
        delete findEmail.password;
        res.status(200).json({token,findEmail});
    }
    catch(err)
    {
        res.status(500).json({error:err.message})
    }
}