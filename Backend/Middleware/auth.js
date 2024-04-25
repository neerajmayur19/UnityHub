import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verified = (req,res,next) => {
    try{
        const token = req.header("Authorization");

        if(!(token))
        res.status(500).json("Token Not Present");

        if(token.startsWith("Bearer"))
        token = token.slice(7,token.length).trimLeft();

        const verifyToken = jwt.verify(token,process.env.JWT_SECRETKEY);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
}