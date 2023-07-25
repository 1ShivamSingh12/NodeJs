import { Request, Response } from "express";
import { userData } from "../models/insta_user";
import mongoose from "mongoose";

export const followRequest = async (req: Request, res: Response) => {
  let { user_id } = req.body;

  let receiverId = new mongoose.Types.ObjectId(req.body.receiverId);
  let userId = new mongoose.Types.ObjectId(user_id.id);

  // let result = await userData.updateOne(
  //   { _id: userId },
  //   { $inc: { followingCount: 1 } }
  // );

  // let count = await userData.updateOne(
  //   { _id: receiverId },
  //   { $inc: { followerCount: 1 } }
  // );

  res.send("done");
};


export const unfollowRequest = async (req: Request, res: Response) => {
    let { user_id } = req.body;
  
    let receiverId = new mongoose.Types.ObjectId(req.body.receiverId);
    let userId = new mongoose.Types.ObjectId(user_id.id);
  
    // let result = await userData.updateOne(
    //   { _id: userId },
    //   { $inc: { followingCount: 1 } }
    // );
  
    // let count = await userData.updateOne(
    //   { _id: receiverId },
    //   { $inc: { followerCount: 1 } }
    // );
  
    res.send("done");
  };
