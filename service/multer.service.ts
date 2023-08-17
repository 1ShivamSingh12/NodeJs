import multer from "koa-multer";
import koaBody from "koa-body";
import Koa from "koa";

export let fileName = ""
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("hyy");
    
    fileName = file.originalname;
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const Multer = multer({ storage: storage });
