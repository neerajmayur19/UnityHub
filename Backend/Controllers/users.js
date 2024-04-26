import User from "../Models/user.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


export const getUserFriends = async (req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        if(!user)
        return res.status(404).json({message:"User Not Found"});

        const userFriends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        console.log(userFriends);
        const formattedFriends = await userFriends.map(
            ({_id,firstName,lastName,email,password,friends,picturePath})=>{return {_id,firstName,lastName,email,password,friends,picturePath}}
        );
        return res.status(200).json({formattedFriends});
    }
    catch(err){
        return res.status(404).json({error:err.message});
    }
}

export const addRemoveFriend = async (req,res) => {
    try{
        const {id,friendId} = req.params;
        console.log(id);
        console.log(friendId);
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(!user || !friend)
        return res.status(404).json({message:"ID Not Found"});

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = friend.friends.filter(ID => ID !== id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const userFriends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        console.log(userFriends);
        const formattedFriends = await userFriends.map(
            ({_id,firstName,lastName,email,password,friends,picturePath})=>{return {_id,firstName,lastName,email,password,friends,picturePath}}
        );
        return res.status(200).json({formattedFriends});
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
}