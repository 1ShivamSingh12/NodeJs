import { Request, Response } from "express";
import mongoose from "mongoose";
import { postData } from "../../models/post";
import { userData } from "../../models/insta_user";
import { number } from "joi";

export const insertPost = async (req: Request, res: Response) => {
  try {
    
    let userId = new mongoose.Types.ObjectId(req.body.user_id);
    console.log(req.body.user_id);
    
    
    // let result = await postData.insertMany([
    //   {
    //     user_id: userId,
    //     image: req.body.image,
    //     description: req.body.description,
    //     likesCount: 0,
    //     commentCount: 0,
    //   },
    // ]);
    // let result = await userData.updateOne(
    //     { _id: userId },
    //     { $inc: { postCount: 1 } }
    //   );
    
    // res.send(result)
    // if (result) {
    //   res.status(201).send("Inserted Successfully");
    // }
  } catch (error) {
    res.send(error);
  }
};
