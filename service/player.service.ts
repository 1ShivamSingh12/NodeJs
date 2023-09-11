import { BaseContext, Context } from "koa";
import { fileName } from "./multer.service";
import mongoose from "mongoose";
import { PlayerEntity } from "../entity/playerEntity";

export class playerService {
  static playerInsert = async (ctx: Context) => {
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

    return data;
  };

  static playersData = async (ctx: Context) => {
    let playerdata = await PlayerEntity.findById(
      { _id: new mongoose.Types.ObjectId(ctx.params.id) },
      {},
      {}
    );

    return playerdata
  };

  static playersUpdate = async (ctx: Context) => {
   
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

    return playerUpdate
  };
}

