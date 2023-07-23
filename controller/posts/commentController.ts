
import { Response, Request } from "express";
import mongoose from "mongoose";
import { commentData } from "../../models/comment";
import { postData } from "../../models/post";
import { actions } from "../../models/action";


export const comment = async(req:Request , res:Response)=>{

    let userId = new mongoose.Types.ObjectId(req.body.user_id);
    console.log(userId);
    
    console.log(req.body , 'comment');
    

    // let result = await commentData.insertMany([
    //   {
    //     post_id:req.body.post_id,
    //     user_id: userId,
    //     comment_description:req.body.description,
    //     comment_likes:0,
    //   },
    // ]);

    // let result1 = await postData.updateOne(
    //     { _id: req.body.post_id },
    //     { $inc: { commentCount: 1 } }
    //   );

      // let result2 = await actions.insertMany([
      //   {
      //     user_id:userId,
      //     type:"Comment"
      //   }
      // ])
  
      res.send('done')

}