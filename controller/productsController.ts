import { Request, Response } from "express";
import { Category } from "../models/categoryModel";
import { Products } from "../models/productModel";
import fs from "fs";
import path from "path";
import { Images } from "../models/imagesModel";
import { Users } from "../models/userModels";
import { Address } from "../models/addressModel";

export const addProduct = async (req: Request, res: Response) => {
  try {
    let result = await Category.findOne({
      where: {
        category_name: req.body.category,
      },
    });

    const { category, ...body } = req.body;

    let payload = {
      ...body,
      owner_id: req.body.user_id,
      category_id: result?.dataValues.id,
      latestBid: req.body.price,
    };

    let insertedData = await Products.create(payload);
    if (insertedData) {
      res.status(201).json({ message: "success", data: "inserted" });
    } else {
      res.send("Not inserted");
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const blobsFile = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const imagePath = path.join("uploads", <string>file?.filename);
        const imageBuffer = fs.readFileSync(imagePath);
        const blobFile = Buffer.from(imageBuffer);
        blobsFile.push(blobFile);
      }

      for (const file of blobsFile) {
        let payload = {
          product_id: req.params.id,
          images: file,
        }
        // console.log(payload);
        let result = await Images.create(payload);
        if (result) {
          res.status(200).send("Uploaded Successfuly");
        } else {
          res.status(200).send("Error");
        }
      }
    }
  } catch (error) {}
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    let result = await Category.findAll({
      where: {
        parent_id: 0,
      },
    });

    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const profileDetails = async (req: Request, res: Response) => {
  try {
    let productDetail = await Products.findByPk(req.params.id);

    let user = await Users.findAll({
      where: {
        id: productDetail?.dataValues.owner_id,
      },
    });

    let category = await Category.findAll({
      where: {
        id: productDetail?.dataValues.category_id,
      },
    });

    let address = await Address.findAll({
      where: {
        id: productDetail?.dataValues.address_id,
      },
    });

    console.log(productDetail);

    res.send("done");
  } catch (error) {
    res.send(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    let result = await Products.update(
      {
        price: req.body?.price,
        latestBid: req.body?.price,
        name: req.body?.name,
      },
      { where: { id: req.params.id } }
    );
    console.log(result);

    res.send("Updated");
  } catch (error) {
    res.send(error);
  }
};

export const productBidding = async (req: Request, res: Response) => {
  try {
    const { product_id, bidPrice, user_id } = req.body;

    await Products.increment("latestBid", {
      by: bidPrice,
      where: { id: product_id },
    });

    await Products.update(
      { bidder_id: user_id },
      { where: { id: product_id } }
    );

    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {

  let result = await Users.findAll({
    attributes: ["first_Name", "last_Name", "email"],
    include: [
      {
        model: Products,
        attributes: ["name", "bidder_id", "price", "latestBid"],
      },
      {
        model: Users,
        attributes: ["first_Name"],
      },
    ],
    where: { id: req.body.user_id },
  });

  res.send(result);
};

export const getCategoryProduct = (req: Request, res: Response) => {};
