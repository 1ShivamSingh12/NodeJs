import { Context } from "koa";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileName } from "../service/multer";
import { playerData } from "../models/playerModel";


export class players {

  static playerInsertion = async(ctx: Context ) => {

    try {
        
        console.log(fileName);
    
    
        const requestBody:any = ctx.request.body
        
        let teamId = new mongoose.Types.ObjectId("64cc9230de9efedc577a2e99");
        
        
        // const imagePath = path.join("uploads", fileName);
    
        // const imageBuffer = fs.readFileSync(imagePath);
        // console.log(imageBuffer);
        
    
        let payload = {
          ...requestBody,
          team_id: teamId,
          Role: "bowler",
        //   profilePic:imageBuffer
        }

        // console.log(payload);
        
    
        let data = await playerData.insertMany([
            {
                ...payload
            }
        ])
    
        if(data){
            ctx.status=200;
            ctx.response.body = "Inserted"
        }
    } catch (error) {
        ctx.response.body = error
    }



  };

  static fileInsert = (ctx: Context) => {

  };
}
