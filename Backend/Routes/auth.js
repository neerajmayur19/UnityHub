import {login} from "../Controllers/auth.js";
import {verified} from "../Middleware/auth.js";
import express from "express";

const AuthRoute = express.Router();

AuthRoute.post("/login",verified,login);

export default AuthRoute;