import { Context } from "koa";
import { teamData } from "../models/team";
import mongoose from "mongoose";
import { TeamEntity } from "../entity/teamEntity";

export class teams {
  static teamInsertion = async (ctx: Context) => {
    let requestBody: any = ctx.request.body;

    try {
      if (requestBody) {
        let teamInsert = await TeamEntity.insertMany([
          {
            ...requestBody,
          },
        ],{});
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
      let requestBody: any = ctx.params.id;
      console.log(requestBody);

      let teamId = new mongoose.Types.ObjectId(requestBody);

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
      console.log(JSON.stringify(result));

      ctx.response.body = JSON.stringify(result, null, 2);
    } catch (error) {
      ctx.response.body = error;
    }
  };

  static updateTeam = async (ctx: Context) => {
    try {
      let requestBody:any = ctx.request.body;

      let updatedTeam = await TeamEntity.findByIdAndUpdate(ctx.params.id, {
        $set: {
          ...requestBody,
        },
      },{});

      if (updatedTeam) {
        ctx.response.body = updatedTeam;
      }
    } catch (error) {
      ctx.response.body = error;
    }
  };
}
