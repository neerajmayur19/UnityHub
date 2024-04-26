import express from "express"
import {verified} from "../Middleware/auth.js"
import {getUser,getUserFriends,addRemoveFriend} from "../Controllers/users.js"

const router = express.Router();

router.get("/:id",getUser);
router.get("/:id/friends",verified,getUserFriends);

router.patch("/:id/:friendId",verified,addRemoveFriend);

export default router;