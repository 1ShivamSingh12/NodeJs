import { Context } from "koa";
import mongoose from "mongoose";
import { fileName } from "../service/multer.service";
import { playerData } from "../models/playerModel";
import { PlayerEntity } from "../entity/playerEntity";
import { playerService } from "../service/player.service";

export class players {
  static playerInsertion = async (ctx: Context) => {
    try {
      const response = await playerService.playerInsert(ctx);
      ctx.status = 200;
      ctx.response.body = response;
    } catch (error) {
      ctx.response.body = error;
    }
  };

  static getPlayers = async (ctx: Context) => {
    try {
      const response = await playerService.playersData(ctx);
      ctx.response.status = 200;
      ctx.body = { message: response };
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = { message: "Not found" };
    }
  };

  static playerUpdate = async (ctx: Context) => {
    try {
      const response = await playerService.playersUpdate(ctx);
      ctx.response.status = 200;
      ctx.response.body = { message: "Updated Successfully" };
    } catch (error) {
      ctx.response.status = 500
      ctx.response.body = "Error";
    }
  };
}
