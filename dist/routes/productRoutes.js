"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const productsController_1 = require("../controller/productsController");
const multer_1 = require("../middleware/multer");
const validateToken_1 = require("../middleware/validateToken");
const productRoutes = (app) => {
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
    app.post("/addProduct", validateToken_1.verifyToken, productsController_1.addProduct);
    app.post("/uploadImage/:id", validateToken_1.verifyToken, multer_1.Multer.array('file'), productsController_1.uploadImage);
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
    app.get("/getCategories", productsController_1.getCategories);
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
    app.get("/profileDetail/:id", validateToken_1.verifyToken, productsController_1.profileDetails);
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
    app.post("/updateProduct/:id", validateToken_1.verifyToken, productsController_1.updateProduct);
    app.post("/bid", validateToken_1.verifyToken, productsController_1.productBidding);
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
    app.get("/products", validateToken_1.verifyToken, productsController_1.getProduct);
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
    app.get("/catgories", validateToken_1.verifyToken, productsController_1.getCategoryProduct);
};
exports.productRoutes = productRoutes;
