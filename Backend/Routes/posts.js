import express from "express"
import {getFeedPosts, getUserPosts, likePost} from "../Controllers/posts.js"
import {verified} from "../Middleware/auth.js"

const PostRoute = express.Router();

PostRoute.get("/",verified,getFeedPosts);
PostRoute.get("/:userId/posts",verified,getUserPosts);

PostRoute.patch("/:id/like",verified,likePost);

export default PostRoute;