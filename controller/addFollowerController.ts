import { sequelize } from "../config/db";
import Follower_Management from "../models/follower";
import { Request , Response } from "express";

export const addFollower = async (req: Request, res: Response) => {
    try {
        console.log(req.body,'idddddddddddddddd');
        
      const [my_id, b] = await sequelize.query(
        `Select id from "Users" where "email" = '${req.body.token.username}';`
      );
      const follower_id = my_id[0].id;
      const following_id = req.body.id;
      const follower: Follower_Management = await Follower_Management.create({
        following_id,
        follower_id,
      });
      res.status(200).send("Table Created");
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  };