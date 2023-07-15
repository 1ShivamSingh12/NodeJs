import { generateToken } from "../middleware/tokenVerify";
import { Response, Request } from "express";
import { loginSchema } from "../validation/userVAlidation";

export const login = async (req: Request, res: Response) => {
  const { error } = await loginSchema.validateAsync(req.body);

  generateToken(req, res);
  
};
