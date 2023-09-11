import { Context } from "koa";
import { teamService } from "../service/teams.service";

export class teams {
  static teamInsertion = async (ctx: Context) => {
    try {
      const response = await teamService.teamInsert(ctx);
      ctx.status = 200;
      ctx.response.body = { message: "Player Inserted" };
    } catch (error) {
      ctx.status = 500;
      ctx.response.body = { message: "Error" };
    }
  };

  static teamDetail = async (ctx: Context) => {
    try {
      const response = await teamService.teamData(ctx);
      ctx.status = 200;
      ctx.response.body = JSON.stringify(response, null, 2);
    } catch (error) {
      ctx.status = 500;
      ctx.response.body = "Error";
    }
  };

  static updateTeam = async (ctx: Context) => {
    try {
      const response = await teamService.teamUpdate(ctx);
      ctx.response.body = response;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
      ctx.response.body = "Error";
    }
  };
}
