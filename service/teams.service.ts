import { Context } from "koa";
import { TeamEntity } from "../entity/teamEntity";
import mongoose from "mongoose";
import { teamData } from "../models/team";

export class teamService {
  static teamInsert = async (ctx: Context) => {
    let requestBody: any = ctx.request.body;
    if (requestBody) {
      let teamInsert = await TeamEntity.insertMany(
        [
          {
            ...requestBody,
          },
        ],
        {}
      );

      return teamInsert;
    } else {
      throw new Error("Invalid Request");
    }
  };

  static teamData = async (ctx: Context) => {
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
    return result;
  };


  static teamUpdate = async(ctx:Context)=>{
    let requestBody: any = ctx.request.body;

    let updatedTeam = await TeamEntity.findByIdAndUpdate(
      ctx.params.id,
      {
        $set: {
          ...requestBody,
        },
      },
      {}
    );

    return updatedTeam

  }
}
