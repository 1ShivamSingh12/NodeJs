import fs from "fs";

import { v4 as uuidv4 } from "uuid";
import {
  loginSchema,
  registerSchema,
  udpateSchema,
} from "../validation/onboarding-validation.js";

export const registerUser = async (req, res) => {
  try {
    const { error } = await registerSchema.validateAsync(req.body);

    req.body.id = uuidv4();

    let userList = getUserList();

    if (!userList) {
      let userList = [];
      userList.push(req.body);
      fs.writeFileSync("userData/userData.json", JSON.stringify(userList));
      res.status(202).send("User registered successfully");
    } else {
      let userListParsed = JSON.parse(userList);
      userListParsed.push(req.body);
      fs.writeFileSync(
        "userData/userData.json",
        JSON.stringify(userListParsed)
      );
      res.status(202).send("User registered successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { error } = await loginSchema.validateAsync(req.body);

  const { email, password } = req.body;
  let userList = getUserList();
  if (!userList) {
    res.status(400).send("No users exist!!");
  } else {
    let userIndex = JSON.parse(userList).findIndex(
      (user) => email === user.email && password === user.password
    );
    if (userIndex == -1) {
      res.status(400).send("This user does not exist !!");
    } else {
      let loggedInUser = JSON.parse(userList)[userIndex];
      res.status(200).send({
        first_name: loggedInUser.first_name,
        last_name: loggedInUser.last_name,
        dob: loggedInUser.dob,
        gender: loggedInUser.gender,
      });
    }
  }
};

export const getUser = (req, res) => {
  const id = req.params.id;
  let userList = getUserList();
  if (!userList) {
    res.status(400).send("No user Exist");
  } else {
    let userIndex = JSON.parse(userList).findIndex((user) => id === user.id);
    if (userIndex == -1) {
      res.status(400).send("No data found");
    } else {
      let userDetail = JSON.parse(userList)[userIndex];
      console.log(userDetail);
    }
  }
};

export const updateUser = async (req, res) => {
  try {
      
      const id = req.params.id;
      console.log(req.body);
      
      const { error } = await udpateSchema.validateAsync(req.body);
    let userList = getUserList();
    if (!userList) {
      res.status(400).send("No user exist!!");
    } else {
      let parsedUserList = JSON.parse(userList);
      parsedUserList.map((user) => {
        if (user.id === id) {
          user.first_name = req.body.first_name;
          user.last_name = req.body.last_name;
          user.dob = req.body.dob;
        }
      });
      fs.writeFileSync("userData/userData.json", JSON.stringify(parsedUserList));

      res.status(201).send("Successfully Updated");
    }
  } catch (e) {
    console.log(e);
  }
};

const getUserList = () => {
  let userList = fs.readFileSync("userData/userData.json", {
    encoding: "utf8",
  });
  return userList;
};
