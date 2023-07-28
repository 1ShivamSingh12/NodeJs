import { Request, Response } from "express";
import { Category } from "../models/categoryModule";
import { Products } from "../models/product";

export const addProduct = async(req: Request, res: Response) => {

  try {
    let result = await Category.findOne({where:{
        category_name : req.body.category
    }})

    const { category, ...body } = req.body;
    
    let payload = {
        ...body,
        owner_id : req.body.user_id,
        category_id : result?.dataValues.id,
        latestBid:req.body.price
    }

    let insertedData = await Products.create(payload)
    if(insertedData){
        res.status(201).json({"message":"success","data":"inserted"})
    }else{
        res.send('Not inserted')
    }
    
  } catch (error) {
    console.log(error);
    
  }
};
