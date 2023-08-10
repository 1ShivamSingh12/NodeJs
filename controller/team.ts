import { Context } from "koa";
import { teamData } from "../models/team";
import mongoose from "mongoose";

export class teams {
  static teamInsertion = async (ctx: Context) => {
    let requestBody: any = ctx.request.body;

    try {
      if (requestBody) {
        let teamInsert = await teamData.insertMany([
          {
            ...requestBody,
          },
        ]);
        ctx.status = 200;
        ctx.body = { message: "Inserted" };
      } else {
        throw new Error("Invalid Request");
      }
    } catch (error) {
      ctx.response.body = error;
    }
  };

  static teamDetail = async (ctx: Context) => {
    try {
      let requestBody: any = ctx.request.body;

      let teamId = new mongoose.Types.ObjectId(requestBody.teamId);

      let result = await teamData.aggregate([
        {
          $match: { _id: { $eq: teamId } },
        },
        {
          $lookup: {
            from: "players",
            localField: "_id",
            foreignField: "team_id",
            as: "players",
          },
        },
        // {
        //   $project: {
        //     _id : teamId,
        //     players: {
        //       $map: {
        //         input: "$players",
        //         as: "player",
        //         in: {
        //           Name: "$$player.Name",
        //           Role: "$$player.Role",
        //         },
        //       },
        //     },
        //   },
        // },
      ]);

      ctx.response.body = result;
    } catch (error) {
      ctx.response.body = error;
    }
  };
}
