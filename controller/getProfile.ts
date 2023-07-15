import { sequelize } from "../config/db";
import { Response, Request } from "express";


export const getProfile =   async (req: Request, res: Response) => {
    const [users_id, b] = await sequelize.query(
      `Select id from "Users" where email = '${req.body.token.username}';`
    );
    const [other_user_id, x] = await sequelize.query(
      `Select following_id from "Follower_Managements";`
    );
    // console.log(other_user_id[0].following_id);

    //     const [result,z] = await sequelize.query(`Select f.follower_id , f.following_id , u.name , u.email from "Users" u inner join "Follower_Managements" f on ${users_id[0].id} = ${other_user_id[0].following_id}`)

    //     const [result1,s] = await sequelize.query(`Select f.follower_id , f.following_id , u.name , u.email from "Users" u inner join "Follower_Managements" f on ${users_id[0].id} = ${other_user_id[1].following_id}`)

    //   res.send(result1[0])
  }