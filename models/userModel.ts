import mongoose from "mongoose";

enum userRole {
  USER = "user",
  ADMIN = "admin",
}

const user = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(userRole),
    required: true,
  },
});

export const userData = mongoose.model("Users", user);

