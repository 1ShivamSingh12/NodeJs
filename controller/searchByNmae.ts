import { Op } from "sequelize";
import { User } from "../models/userModel";
import { Response, Request } from "express";


export const serachByName =  async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        where: { name: { [Op.iLike]: `%${req.body.name}%` } },
      });
  
      res.status(200).send(users);
    } catch (error) {}
    // const [result,b] = await sequelize.query(`Select * from "Users" where name = '${req.body.name}';`)
    // res.send(result)
  };
  