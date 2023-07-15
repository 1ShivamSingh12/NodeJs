import express from "express";
import * as dotenv from "dotenv";
import { verifyToken } from "./middleware/tokenVerify";
import { login } from "./controller/logijnController";
import { signUp } from "./controller/signUpController";
import { addFollower } from "./controller/addFollowerController";
import { followerList } from "./controller/followerListController";
import { getProfile } from "./controller/getProfile";
import { getUserProfile } from "./controller/getUserController";
import { serachByName } from "./controller/searchByNmae";
import { fetchUsers } from "./controller/fetchUsers";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.post("/signUp", signUp)

app.post("/login", login)

app.get("/getAllUsers",fetchUsers)

app.post("/add", verifyToken, addFollower)

app.get("/follower-list", verifyToken, followerList);

app.get("/get-profile", verifyToken, getUserProfile);

app.get("/profile-details",verifyToken,getProfile);

app.get("/search", verifyToken, serachByName)


app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
