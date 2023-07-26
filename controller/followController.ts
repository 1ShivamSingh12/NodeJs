import { Request, Response } from "express";
import { userData } from "../models/insta_user";
import mongoose from "mongoose";
import { follow } from "../models/followerManagement";

export const followRequest = async (req: Request, res: Response) => {
  let { user_id } = req.body;

  let receiverId = new mongoose.Types.ObjectId(req.body.receiver_id);
  let userId = new mongoose.Types.ObjectId(user_id);

  // let count = await userData.updateOne(
  //   { _id: receiverId },
  //   { $inc: { followerCount: 1 } }
  // );

  res.send("done");
};

export const unfollowRequest = async (req: Request, res: Response) => {
  let { user_id } = req.body;
  console.log(req.body);

  let receiverId = new mongoose.Types.ObjectId(req.body.receiver_id);
  let userId = new mongoose.Types.ObjectId(user_id);

  //   let result = await follow.deleteOne({sender_id:req.body.user_id.toString(),receiver_id:req.body.receiver_id.toString()});

  //  let result1 = await userData.updateOne(
  //     { _id: userId },
  //     { $inc: { followingCount: -1 } }
  //   );

  // console.log(result1,'llllll');

  // if(result1){
  //   res.send("done");
  // }
};

export const getFollowing = async (req: Request, res: Response) => {
  let { user_id } = req.body;
  console.log(req.body);

  let userId = new mongoose.Types.ObjectId(user_id);

  try {
    let result = await follow.aggregate([
      {
        $match: {sender_id: { $eq: userId}},
      },
      {
        $lookup: {
          from: "instagramusers",
          localField: "receiver_id",
          foreignField: "_id",
          as: "Following_list",
        }
      },
    ]);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const getFollower = async(req: Request, res: Response) =>{
  let { user_id } = req.body;

  let userId = new mongoose.Types.ObjectId(user_id);

  try {
    let result = await follow.aggregate([
      {
        $match: {receiver_id: { $eq: userId}},
      },
      {
        $lookup: {
          from: "instagramusers",
          localField: "sender_id",
          foreignField: "_id",
          as: "Follower_list",
        }
      },
    ]);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
}
