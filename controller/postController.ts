import { Request, Response } from "express";
import mongoose from "mongoose";
import { postData } from "../models/post";
import { userData } from "../models/insta_user";
import { commentData } from "../models/comment";

export const insertPost = async (req: Request, res: Response) => {
  try {
    let userId = new mongoose.Types.ObjectId(req.body.user_id);
    console.log(req.body.user_id);

    let result1 = await postData.insertMany([
      {
        user_id: userId,
        image: req.body.image,
        description: req.body.description,
        likesCount: 0,
        commentCount: 0,
      },
    ]);
    let result = await userData.updateOne(
      { _id: userId },
      { $inc: { postCount: 1 } }
    );

    res.send(result && result1);
    if (result) {
      res.status(201).send("Inserted Successfully");
    }
  } catch (error) {
    res.send(error);
  }
};

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

export const comment = async (req: Request, res: Response) => {
  let userId = new mongoose.Types.ObjectId(req.body.user_id);
  console.log(userId);

  console.log(req.body, "comment");

  let result = await commentData.insertMany([
    {
      post_id: req.body.post_id,
      user_id: userId,
      comment_description: req.body.description,
      comment_likes: 0,
    },
  ]);

  let result1 = await postData.updateOne(
    { _id: req.body.post_id },
    { $inc: { commentCount: 1 } }
  );

  res.send("done");
};
