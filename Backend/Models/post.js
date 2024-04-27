import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    userId:{
        type:String,
        require: true
    },
    firstName:{
        type:String,
        require:true,
        max:50
    },
    lastName:{
        type:String,
        require:true,
        max:50
    },
    location: String,
    description:String,
    userPicturePath:{
        type:String,
        require: true
    },
    picturePath:{
        type:String,
        require:true
    },
    likes:{
        type: Map,
        Of: Boolean
    },
    comments:{
        type: Array,
        default: []
    }
})

const Post = mongoose.model("Post",postSchema);
export default Post;