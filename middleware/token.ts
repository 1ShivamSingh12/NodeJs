import { Context } from "koa";
import jsonwebtoken from "jsonwebtoken";

const key: string = <string>process.env.SECRETKEY;

export const verifyToken = (ctx: Context, next: any) => {
  const tokenToVerify: string = <string>ctx.header.authorization;
  console.log(tokenToVerify);
  
  try {
    if (tokenToVerify) {
      const decoded = jsonwebtoken.verify(tokenToVerify, key);

      ctx.state.user = decoded;
      ctx.status = 200;
      // ctx.body = { message: "Verified" };
      next();
    } else {
      ctx.status = 401;
      ctx.body = { message: "No token provided" };
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = { message: "Invalid token" };
  }
  
};
