import { Application } from "express";
import {
  addAddress,
  deleteProfile,
  forgetPassword,
  getProfile,
  logOut,
  loginUser,
  signUp,
  updateProfile,
} from "../controller/onboardingController";
import { verifyToken } from "../middleware/validateToken";
import { addProduct, getCategories, getProduct, productBidding, profileDetails, updateProduct, uploadImage } from "../controller/productsController";
import multer from "multer";
import { Multer } from "../middleware/multer";

export const routes = (app: Application) => {
  /**
   * @openapi
   * /signUp:
   *  post:
   *    tags:
   *    - Register User
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
   *    - Adding address of user
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

  app.post("/addAddress",verifyToken, addAddress);

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
   * /updateProfile:
   *   post:
   *     tags:
   *     - Update user Profile
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
   *     - Reset Password
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
   *       - Get user
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
   *       - Delete User profile
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
   *       - Log out user
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

  /**
   * @openapi
   * /addProduct:
   *  post:
   *    tags:
   *    - Add product
   *    description: Add product.
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *              description:
   *                type: string
   *              price:
   *                type: bigint
   *    responses:
   *      200:
   *        description: User registration successful.
   *      400:
   *        description: Bad Request - Invalid data provided.
   *      500:
   *        description: Internal Server Error - Failed to register user.
   */

  app.post("/addProduct", verifyToken, addProduct);



  app.post("/uploadImage/:id", verifyToken , Multer.array('file'), uploadImage)

/**
   * @openapi
   * /getCategories:
   *   get:
   *     tags:
   *       - Get Category
   *     description: Fetch all the Categories.
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

  app.get("/getCategories", getCategories)


  /**
   * @openapi
   * /profileDtail:
   *   get:
   *     tags:
   *       - Get profile Detail
   *     description: Get profile detail
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

  app.get("/profileDetail/:id", verifyToken, profileDetails);


  /**
 * @openapi
 * /updateProduct:
 *   post:
 *     tags:
 *       - Update Product
 *     description: Update Product.
 *     requestBody:
 *       description: User object that needs to be added to the system.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           description: Access token for authentication.
 *     responses:
 *       201:
 *         description: Updated successfully.
 *       400:
 *         description: Bad request.
 */


  app.post("/updateProduct/:id", verifyToken, updateProduct);


  app.post("/bid", verifyToken, productBidding);

  
   /**
   * @openapi
   * /products:
   *   get:
   *     tags:
   *       - Get User Product
   *     description: Get User Product
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


   app.get("/products" , verifyToken , getProduct)


};
