import express, { Application } from "express";
import { insertPost } from "../controller/createPostController";
import { followRequest } from "../controller/followerCount";
import { getUsers } from "../controller/getUserController";
import { loginUser } from "../controller/loginUser";
import { likePost } from "../controller/postLikeController";
import { registerUser } from "../controller/signUpController";
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
 *              $ref: '#/components/schemas/User'
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
 *     - Follow a User
 *     description: Follow a User.
 *     requestBody: 
 *       description: User object that needs to be added to the system.
 *       required: true
 *       content:
 *         application/json:
 *              schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       201:
 *         description: Successful
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
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               description:
 *                  type:string
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
 *         description: SignUp successful
 *       400:
 *         description: Bad request. Invalid.
 */

  app.post("/likePost", verifyToken, likePost);
};
