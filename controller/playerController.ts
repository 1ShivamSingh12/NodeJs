import { Context } from "koa";
import mongoose from "mongoose";
import { fileName } from "../service/multer.service";
import { playerData } from "../models/playerModel";

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

      let data = await playerData.insertMany([
        {
          ...payload,
        },
      ]);

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
      let playerdata = await playerData.findById({
        _id: new mongoose.Types.ObjectId(ctx.params.id),
      });

      if (playerData) {
        return (ctx.response.body = playerData);
      }
    } catch (error) {
      return (ctx.response.body = error);
    }
  };

  static playerUpdate = async (ctx: Context) => {
    try {
      const requestBody: any = ctx.request.body;

      let existingData = await playerData.findById(ctx.params.id)
      
      let payload = {
        Name: requestBody.Name,
        Age: requestBody.Age,
        Country: requestBody.Country,
        Role: requestBody.Role,
        performance: {
          Matches: requestBody.Matches || existingData.performance.Matches,
          Runs: requestBody.Runs || existingData.performance.Runs,
          Centuries: requestBody.Centuries || existingData.performance.Centuries,
          Half_Century: requestBody.Half_Century || existingData.performance.Half_Century,
          Overs_Bowled: requestBody.Overs_Bowled || existingData.performance.Overs_Bowled,
          Total_Wickets: requestBody.Total_Wickets || existingData.performance.Total_Wickets,
          Best_Figure: requestBody.Best_Figure || existingData.performance.Best_Figure,
        },
      };

      let playerUpdate = await playerData.findByIdAndUpdate(ctx.params.id, {
        $set: {
          ...payload,
        },
      });

      if (playerUpdate) {
        ctx.response.body = playerUpdate;
      }
    } catch (error) {
      return (ctx.response.body = error);
    }
  };
}
