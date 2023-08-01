"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryProduct = exports.getProduct = exports.productBidding = exports.updateProduct = exports.profileDetails = exports.getCategories = exports.uploadImage = exports.addProduct = void 0;
const categoryModel_1 = require("../models/categoryModel");
const productModel_1 = require("../models/productModel");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imagesModel_1 = require("../models/imagesModel");
const userModels_1 = require("../models/userModels");
const addressModel_1 = require("../models/addressModel");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield categoryModel_1.Category.findOne({
            where: {
                category_name: req.body.category,
            },
        });
        const _a = req.body, { category } = _a, body = __rest(_a, ["category"]);
        let payload = Object.assign(Object.assign({}, body), { owner_id: req.body.user_id, category_id: result === null || result === void 0 ? void 0 : result.dataValues.id, latestBid: req.body.price });
        let insertedData = yield productModel_1.Products.create(payload);
        if (insertedData) {
            res.status(201).json({ message: "success", data: "inserted" });
        }
        else {
            res.send("Not inserted");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addProduct = addProduct;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blobsFile = [];
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const imagePath = path_1.default.join("uploads", file === null || file === void 0 ? void 0 : file.filename);
                const imageBuffer = fs_1.default.readFileSync(imagePath);
                const blobFile = Buffer.from(imageBuffer);
                blobsFile.push(blobFile);
            }
            for (const file of blobsFile) {
                let payload = {
                    product_id: req.params.id,
                    images: file,
                };
                // console.log(payload);
                let result = yield imagesModel_1.Images.create(payload);
                if (result) {
                    res.status(200).send("Uploaded Successfuly");
                }
                else {
                    res.status(200).send("Error");
                }
            }
        }
    }
    catch (error) { }
});
exports.uploadImage = uploadImage;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield categoryModel_1.Category.findAll({
            where: {
                parent_id: 0,
            },
        });
        res.send(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getCategories = getCategories;
const profileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productDetail = yield productModel_1.Products.findByPk(req.params.id);
        let user = yield userModels_1.Users.findAll({
            where: {
                id: productDetail === null || productDetail === void 0 ? void 0 : productDetail.dataValues.owner_id,
            },
        });
        let category = yield categoryModel_1.Category.findAll({
            where: {
                id: productDetail === null || productDetail === void 0 ? void 0 : productDetail.dataValues.category_id,
            },
        });
        let address = yield addressModel_1.Address.findAll({
            where: {
                id: productDetail === null || productDetail === void 0 ? void 0 : productDetail.dataValues.address_id,
            },
        });
        console.log(productDetail);
        res.send("done");
    }
    catch (error) {
        res.send(error);
    }
});
exports.profileDetails = profileDetails;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    console.log(req.body);
    try {
        let result = yield productModel_1.Products.update({
            price: (_b = req.body) === null || _b === void 0 ? void 0 : _b.price,
            latestBid: (_c = req.body) === null || _c === void 0 ? void 0 : _c.price,
            name: (_d = req.body) === null || _d === void 0 ? void 0 : _d.name,
        }, { where: { id: req.params.id } });
        console.log(result);
        res.send("Updated");
    }
    catch (error) {
        res.send(error);
    }
});
exports.updateProduct = updateProduct;
const productBidding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, bidPrice, user_id } = req.body;
        yield productModel_1.Products.increment("latestBid", {
            by: bidPrice,
            where: { id: product_id },
        });
        yield productModel_1.Products.update({ bidder_id: user_id }, { where: { id: product_id } });
        res.send("Updated");
    }
    catch (error) {
        console.log(error);
    }
});
exports.productBidding = productBidding;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield userModels_1.Users.findAll({
        attributes: ["first_Name", "last_Name", "email"],
        include: [
            {
                model: productModel_1.Products,
                attributes: ["name", "bidder_id", "price", "latestBid"],
            },
            {
                model: userModels_1.Users,
                attributes: ["first_Name"],
            },
        ],
        where: { id: req.body.user_id },
    });
    res.send(result);
});
exports.getProduct = getProduct;
const getCategoryProduct = (req, res) => { };
exports.getCategoryProduct = getCategoryProduct;
