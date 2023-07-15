import { sequelize } from "../config/db";
import Follower_Management from "../models/follower";
import { Response, Request } from "express";

export const followerList = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        const [my_id, b] = await sequelize.query(
            `Select id from "Users" where email = '${req.body.token.username}';`
        );

        // const [list, z] = await sequelize.query(
        //     `Select following_id from "Follower_Managements" where follower_id = ${my_id[0].id}`
        // );
//doubt
        const users = await Follower_Management.findAll({
            where: {
                following_id: `${my_id[0].id}`,
            },
        });

        res.status(200).send(users);
    } catch (error) {
        console.log(error);
    }
}