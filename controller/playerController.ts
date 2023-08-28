import { Context } from "koa";
import mongoose from "mongoose";
import { fileName } from "../service/multer.service";
import { playerData } from "../models/playerModel";
import { PlayerEntity } from "../entity/playerEntity";

export class players {
  static playerInsertion = async (ctx: Context) => {
    try {
      console.log(fileName);

      const requestBody: any = ctx.request.body;

      requestBody.team_id = new mongoose.Types.ObjectId(requestBody.team_id);

      // const imagePath = path.join("uploads", fileName);

      // const imageBuffer = fs.readFileSync(imagePath);
      // console.log(imageBuffer);

      let payload = {
        ...requestBody,
        //   profilePic:imageBuffer
      };

      let data = await PlayerEntity.insertMany(
        [
          {
            ...payload,
          },
        ],
        {}
      );

      if (data) {
        ctx.status = 200;
        ctx.response.body = "Inserted";
      }
    } catch (error) {
      ctx.response.body = error;
    }
  };

  static getPlayers = async (ctx: Context) => {
    try {
      let playerdata = await PlayerEntity.findById(
        { _id: new mongoose.Types.ObjectId(ctx.params.id) },
        {},
        {}
      );

      if (!playerdata) {
        ctx.response.status = 404;
        ctx.body = { message: "Player Not found" };
      } else {
        ctx.response.status = 200;
        ctx.body = { message: playerdata };
      }
      console.log(ctx.response);
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = { message: "Internal Error" };
    }
  };

  static playerUpdate = async (ctx: Context) => {
    try {
      const requestBody: any = ctx.request.body;

      let existingData = await PlayerEntity.findById(
        { _id: new mongoose.Types.ObjectId(ctx.params.id) },
        {},
        {}
      );

      let payload = {
        Name: requestBody.Name,
        Age: requestBody.Age,
        Country: requestBody.Country,
        Role: requestBody.Role,
      };

      let playerUpdate = await PlayerEntity.findByIdAndUpdate(
        ctx.params.id,
        {
          $set: {
            ...payload,
            "performance.Best_Figure":
              requestBody.Best_Figure || existingData.performance.Best_Figure,
          },
          $inc: {
            "performance.Matches": requestBody.Matches || 0,
            "performance.Runs": requestBody.Runs || 0,
            "performance.Centuries": requestBody.Centuries || 0,
            "performance.Half_Century": requestBody.Half_Century || 0,
            "performance.Overs_Bowled": requestBody.Overs_Bowled || 0,
            "performance.Total_Wickets": requestBody.Total_Wickets || 0,
          },
        },
        {}
      );

      if (playerUpdate) {
        ctx.response.body = playerUpdate;
      }
    } catch (error) {
      return (ctx.response.body = error);
    }
  };
}
