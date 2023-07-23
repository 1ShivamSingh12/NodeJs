import { Request, Response } from "express";
import mongoose from "mongoose";
import { likesdata } from "../../models/like";
import { userData } from "../../models/insta_user";
import { postData } from "../../models/post";

export const likePost = async (req: Request, res: Response) => {
  try {
    let userId = new mongoose.Types.ObjectId(req.body.user_id);

    // let result = await likesdata.insertMany([
    //   {
    //     post_id:req.body.post_id,
    //     user_id: userId,
    //   },
    // ]);
    let result1 = await postData.updateOne(
      { _id: req.body.post_id },
      { $inc: { likesCount: 1 } }
    );

    // if(result){
    // }
  } catch (error) {
    res.send(error);
  }
};