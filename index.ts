import express from 'express'
import connectDB from './db';
import { getUsers } from './controller/getUserController';
import * as dotenv from "dotenv";
import { loginUser } from './controller/loginUser';
import { followRequest } from './controller/followerCount';
import { verifyToken } from './middleware/token';
import { insertPost } from './controller/createPostController';
import { likePost } from './controller/postLikeController';
import { registerUser } from './controller/signUpController';

dotenv.config();

const port = process.env.PORT;

const app = express()

app.use(express.json())

app.post('/login',loginUser)

app.post('/signUp',registerUser)

app.get('/getUsers',getUsers)

app.post('/follow',verifyToken ,followRequest)

app.post('/addPost',verifyToken ,insertPost)

app.post('/likePost',verifyToken ,likePost)


app.listen(port , async()=>{

    console.log(`Listening at port ${port}`);

    await connectDB()

})