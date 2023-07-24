import express, { Application } from "express";
import { insertPost } from "../controller/posts/createPostController";
import { followRequest } from "../controller/user/followerCount";
import { getUsers } from "../controller/user/getUserController";
import { loginUser } from "../controller/user/loginUser";
import { likePost } from "../controller/posts/postLikeController";
import { registerUser } from "../controller/user/signUpController";
import { verifyToken } from "../middleware/token";
import { comment } from "../controller/posts/commentController";
import { unfollowRequest } from "../controller/user/unFollowController";

const app = express();

app.use(express.json());

export const routes = (app: Application) => {
  /**
   * @openapi
   * /getUsers:
   *  get:
   *     tags:
   *     - Get user
   *     description: Fetch all the users registered.
   *     responses:
   *       200:
   *         description: App is up and running
   */

  app.get("/getUsers", getUsers);

  /**
   * @openapi
   * /login:
   *   post:
   *     tags:
   *     - Login User
   *     description: Login User.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: Login successful
   *       400:
   *         description: Bad request. Invalid login credentials.
   */

  app.post("/login", loginUser);

  /**
   * @openapi
   * /signup:
   *   post:
   *     tags:
   *     - Register User
   *     description: Register User.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *               bio:
   *                 type: string
   *               profilePic:
   *                 type: string
   *     responses:
   *       201:
   *         description: SignUp successful
   *       400:
   *         description: Bad request. Invalid.
   */

  app.post("/signUp", registerUser);

  /**
   * @openapi
   * /follow:
   *   post:
   *     tags:
   *     - Follow a user
   *     description: Follow a user.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *          schema:
   *             type: object
   *             properties:
   *               sender_id:
   *                 type: number
   *               receiver_id:
   *                 type:number
   *               status:
   *                 type:string 
   *     responses:
   *       201:
   *         description: successful
   *       400:
   *         description: Bad request. Invalid.
   */

  app.post("/follow", verifyToken, followRequest);

 /**
   * @openapi
   * /addPost:
   *   post:
   *     tags:
   *     - Add a post
   *     description: Add a post.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *          schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *     responses:
   *       201:
   *         description: successful
   *       400:
   *         description: Bad request. Invalid.
   */

  app.post("/addPost", verifyToken, insertPost);

  /**
   * @openapi
   * /likePost:
   *   post:
   *     tags:
   *     - Liked a post
   *     description: Liked a post.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *          schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *     responses:
   *       201:
   *         description: successful
   *       400:
   *         description: Bad request. Invalid.
   */

  app.post("/likePost", verifyToken, likePost);

 /**
   * @openapi
   * /comment:
   *   post:
   *     tags:
   *     - Comment on a post
   *     description: Comment on a post.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *          schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *     responses:
   *       201:
   *         description: successful
   *       400:
   *         description: Bad request. Invalid.
   */

  app.post("/comment", verifyToken, comment);

  /**
   * @openapi
   * /unfollow:
   *   post:
   *     tags:
   *     - Unfollow a user
   *     description: Unfollow a user.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *          schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *     responses:
   *       201:
   *         description: successful
   *       400:
   *         description: Bad request. Invalid.
   */

  app.post("/unfollow", verifyToken, unfollowRequest);
};
