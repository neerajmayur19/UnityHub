import Post from "../Models/post.js"
import User from "../Models/user.js";

export const createPost = async (req,res) => {
    try{
        const {userId,description,picturePath} = req.body;
        const user = await User.findById(userId);

        const post = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await post.save();
        return res.status(201).json({post});
    }
    catch(err){
        return res.status(409).json({error:err.message});
    }
}

export const getFeedPosts = async (req,res) => {
    try{
        const posts = await Post.find();
        return res.status(200).json({posts});
    }
    catch(err){
        return res.status(404).json({error:err.message});
    }
}

export const getUserPosts = async (req,res) => {
    try{
        const {userId} = req.params;
        const userPosts = await Post.find({userId:userId});
        return res.status(200).json({userPosts});
    }
    catch(err){
        return res.status(404).json({error:err.message});
    }
}

export const likePost = async (req,res) => {
    try{
        const {id} = req.params;
        const {userId} = req.body;

        const post = await Post.findById(id);
        const visited = post.likes.get(userId);
        if(visited){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        )
        return res.status(200).json({updatedPost});
    }
    catch(err){
        return res.status(404).json({error:err.message});
    }
}