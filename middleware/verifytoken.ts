import { Context } from "koa";
import jsonwebtoken from "jsonwebtoken";

const key: string = <string>process.env.SECRETKEY;

export const verifyToken = async(ctx: Context, next: any) => {
  const tokenToVerify: string = <string>ctx.header.authorization;
  console.log(tokenToVerify);

  try {
    if (tokenToVerify && tokenToVerify.startsWith("Bearer ")) {
      const token = tokenToVerify.substring(7);

      const decoded = jsonwebtoken.verify(token, key);
      if (decoded) {
        await next();
        
      } else {
        console.error(`Invalid Token`);
      }
    } else {
      ctx.status = 401;
      ctx.body = { message: "No token provided" };
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = { message: "Invalid token" };
  }
};
