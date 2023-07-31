import { Application } from "express";
import {
  signUp,
  addAddress,
  loginUser,
  updateProfile,
  forgetPassword,
  getProfile,
  deleteProfile,
  logOut,
} from "../controller/onboardingController";
import { verifyToken } from "../middleware/validateToken";

export const onBoardingRoutes = (app: Application) => {
  /**
   * @openapi
   * /signUp:
   *  post:
   *    tags:
   *    - User
   *    description: Register a new user.
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              first_name:
   *                type: string
   *              last_name:
   *                type: string
   *              email:
   *                type: string
   *              password:
   *                type: string
   *              profilePic:
   *                type: string
   *                format: binary
   *              phone_number:
   *                type: number
   *              gender:
   *                type: string
   *            required:
   *              - first_name
   *              - last_name
   *              - email
   *              - password
   *              - profilePic
   *              - phone_number
   *              - gender
   *    responses:
   *      200:
   *        description: User registration successful.
   *      400:
   *        description: Bad Request - Invalid data provided.
   *      500:
   *        description: Internal Server Error - Failed to register user.
   */

  app.post("/signUp", signUp);

  /**
   * @openapi
   * /addAddress:
   *  post:
   *    tags:
   *    - User
   *    description: Adding address of user.
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              street1:
   *                type: string
   *              street2:
   *                type: string
   *              landmark:
   *                type: string
   *              city:
   *                type: string
   *              state:
   *                type: string
   *              address_type:
   *                type: string
   *              zip_code:
   *                type: bigint
   *    responses:
   *      200:
   *        description: Address Insertion successful.
   *      400:
   *        description: Bad Request - Invalid data provided.
   *      500:
   *        description: Internal Server Error - Failed to register user.
   */

  app.post("/addAddress", verifyToken, addAddress);

  /**
   * @openapi
   * /login:
   *   post:
   *     tags:
   *     - User
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
   * /updateProfile:
   *   post:
   *     tags:
   *     - User
   *     description: Update user Profile.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       201:
   *         description: Updated successful
   *       400:
   *         description: Bad request.
   */

  app.post("/updateProfile", verifyToken, updateProfile);

  /**
   * @openapi
   * /forgetPassword:
   *   post:
   *     tags:
   *     - User
   *     description: Reset Password.
   *     requestBody:
   *       description: User object that needs to be added to the system.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               newPassword:
   *                 type: string
   *               confirmPassword:
   *                 type: string
   *     responses:
   *       201:
   *         description: Updated successful
   *       400:
   *         description: Bad request.
   */

  app.post("/forgetPassword", verifyToken, forgetPassword);

  /**
   * @openapi
   * /getUsers:
   *   get:
   *     tags:
   *       - User
   *     description: Fetch all the users registered.
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         schema:
   *           type: string
   *         required: true
   *         description: Bearer token for authentication
   *     responses:
   *       200:
   *         description: App is up and running
   */

  app.get("/getProfile", verifyToken, getProfile);


  /**
   * @openapi
   * /deleteProfile:
   *   delete:
   *     tags:
   *       - User
   *     description: Delete User profile
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         schema:
   *           type: string
   *         required: true
   *         description: Bearer token for authentication
   *     responses:
   *       200:
   *         description: App is up and running
   */

  app.delete("/deleteProfile", verifyToken, deleteProfile);

  /**
   * @openapi
   * /logOut:
   *   post:
   *     tags:
   *       - User
   *     description: Log out user.
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         schema:
   *           type: string
   *         required: true
   *         description: Bearer token for authentication
   *     responses:
   *       200:
   *         description: App is up and running
   */

  app.post("/logOut", verifyToken, logOut);

  


};
