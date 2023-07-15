import { sequelize } from "../config/db";
import { Response, Request } from "express";


export const getUserProfile = async (req: Request, res: Response) => {
    try {
      const [list, z] = await sequelize.query(
        `Select * from "Users" where id = ${req.body.id};`
      );
  
      res.status(200).send(list[0]);
    } catch (error) {
      console.log(error);
    }
  }
