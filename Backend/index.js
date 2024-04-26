import express from "express"
import mongoose from "mongoose"
import helmet from "helmet"
import multer from "multer"
import morgan from "morgan"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import AuthRoute from "./Routes/auth.js"
import UserRoute from "./Routes/user.js"
import { fileURLToPath } from "url"
import {register} from "./Controllers/auth.js"

/*Configurations*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyParser.json({limit:"30mb", extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}));
app.use("/assets", express.static(path.join(__dirname,"public/assets")));

/* File Storage */
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "public/assets");
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

/*Authentication Routes*/
app.post("/auth/register", upload.single("picture"), register);
app.use("/auth",AuthRoute);
app.use("/user",UserRoute);

/*Database Connection*/
const port = process.env.PORT || 9000
mongoose.connect(process.env.mongo_url,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    app.listen(port,console.log(`Listening on the ${port}`));
}).catch((err) => {
    console.log(err);
})