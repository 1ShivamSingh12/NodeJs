import express, { Application } from "express";
import { getUsers, loginUser, registerUser } from "../controller/userController";
import { followRequest, getFollowing, unfollowRequest } from "../controller/followController";
import { insertPost, likePost, comment } from "../controller/postController";
import { verifyToken } from "../middleware/token";

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
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token for authentication.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               sender_id:
   *                 type: string
   *               receiver_id:
   *                 type: string
   *               status:
   *                 type: string
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
   *     - Create a post
   *     description: Create post.
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token for authentication.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user_id:
   *                 type: string
   *               image:
   *                 type: string
   *               description:
   *                 type: string
   *               tags:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
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
   *     - Post like
   *     description: Post like.
   *
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               post_id:
   *                 type: string
   *               user_id:
   *                 type: string
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
   *     - Add a comment
   *     description: Add a comment.
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token for authentication.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               post_id:
   *                 type: string
   *               user_id:
   *                 type: string
   *               comment_description:
   *                 type: string
   *               comment_likes:
   *                 type: number
   *               comment_reply:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     reply_desc:
 *                       type: string
 *                     reply_likes:
 *                       type: number
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

   /**
 * @openapi
 * /getFollowing:
 *  get:
 *    tags:
 *    - Get user following
 *    description: Fetch all the profile user follows.
 *    parameters:
 *    - in: header
 *      name: authorization
 *      description: An authentication token.
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: App is up and running
 */

   app.get("/getFollowing",verifyToken, getFollowing);

   /**
 * @openapi
 * /getFollower:
 *  get:
 *    tags:
 *    - Get user follower
 *    description: Fetch all the user follower list.
 *    parameters:
 *    - in: header
 *      name: authorization
 *      description: An authentication token.
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: App is up and running
 */

   app.get("/getFollower",verifyToken, getFollowing);


};
