import { Application } from "express";
import { addProduct, uploadImage, getCategories, profileDetails, updateProduct, productBidding, getProduct, getCategoryProduct } from "../controller/productsController";
import { Multer } from "../middleware/multer";
import { verifyToken } from "../middleware/validateToken";

export const productRoutes = (app: Application) => {

    /**
     * @openapi
     * /addProduct:
     *  post:
     *    tags:
     *    - Products
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
     *       - Products
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
     *       - Products
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
   *       - Products
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
     *       - Products
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
  
  
      /**
     * @openapi
     * /catgories:
     *   get:
     *     tags:
     *       - Products
     *     description: Get Category and product associated with them
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
  
  
      app.get("/catgories" , verifyToken , getCategoryProduct)
  
  
  
  };
  