import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {addressSchema,forgetPasswordSchema,loginSchema,registerSchema,updateProfileSchema } from "../validation/onboardingValidation";
import { Address } from "../models/addressModel";
import { Users } from "../models/userModels";
import { generateToken } from "../service/tokenGeneration";
import { Sessions } from "../models/SessionModel";
import { client } from "../config/db";

export const signUp = async (req: Request, res: Response) => {
  try {
    let securePass = await bcrypt.hash(req.body.password, 10);
    req.body.password = securePass;
    let payload = {
      ...req.body,
      status: "active",
    };
    const user: Users = await Users.create(payload);
    res.send(user);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send({ message: "Error inserting user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {

    console.log(req.body);
    
    const { email, password } = req.body;

    if (email && password) {
      
      const [user, a] = await Users.findAll({
        where: {
          email: email,
        },
      });

      const matchPass = await bcrypt.compare(req.body.password , user.dataValues.password)
  
      if (matchPass) {
        req.body.id = user.dataValues.id;
        generateToken(req, res);
      }else{
        res.send("Password is incorrect")
      }
    }else{
      return "Please provide both Email and Password"
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const error = await updateProfileSchema.validateAsync(req.body);

      if (!error) {
        res.send(error);
      } else {
        const updateData = await Users.update(
         req.body,
          { where: { id: req.body.user_id } }
        );
        res.send("Updated");
      }
    } else {
      throw new Error("No data provided");
    }
  } catch (error) {
    res.send(error);
  }
};

export const addAddress = async (req: Request, res: Response) => {
  try {
    const error = addressSchema.validateAsync(req.body);

    if (req.body && !error) {
      console.log(req.body);
      let payload = {
        ...req.body,
        user_id: req.body.user_id,
      };
      console.log(Address, Users);

      let result = await Address.create(payload);

      console.log(result);

      if (result) {
        res.status(200).send("Address inserted");
      } else {
        res.send("Not inserted");
      }
    } else {
      res.send(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassword = async (req: Request, res: Response) => {

  const error = forgetPasswordSchema.validateAsync(req.body);
  try {
    if (req.body && !error) {
      if (req.body.newPassword == req.body.confirmPassword) {
        let securePass = await bcrypt.hash(req.body.newPassword, 10);
        const updateData = await Users.update(
          { password: securePass },
          { where: { id: req.body.user_id } }
        );
        res.send("Changed");
      } else {
        res.send("Password do not match");
      }
    } else {
      res.send(error);
    }
  } catch (error) {
    res.send(error)
  }
};

export const getProfile = async (req: Request, res: Response) => {
  let profile = await Users.findByPk(req.body.user_id);

  res.send(profile);
};

export const logOut = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      let result = await Sessions.destroy({
        where: { user_id: req.body.user_id },
      });
      let redisUpdate = await client.DEL(`${req.body.user_id}_session`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    let user_del = await Users.destroy({
      where: {
        id: req.body.user_id,
      },
    });

    let session_Del = await Sessions.destroy({
      where: {
        user_id: req.body.user_id,
      },
    });

    let redis_Del = await client.del(`${req.body.user_id}_session`);

    if (user_del && session_Del && redis_Del) {
      res.status(200).send("User deleted Successfully.");
    } else {
      res.status(500).send("Error");
    }
  } catch (error) {
    res.send(error);
  }
};
