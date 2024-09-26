import { Request, Response } from "express";
import {createBeeper, gatAllBeepersService, getBeeperById } from "../service/beeperService.js";
import {Beeper} from "../models/beeperModel.js";
import { count, error } from "console";

export const createANewBeeper = async (req:Request, res:Response): Promise<void> => {
    try{
        const name =  req.body.name;
        if(!name){
            res.status(400).json({error: "Name not found"});
        }
        const newBeeper = await createBeeper(name);
        res.status(201).json({ beeper: newBeeper });       
    }
    catch(error: any){
        res.status(500).json({error: "There is a problem with the beeperService"});
    }
}

export const gatAllBeepers = async(req:Request, res:Response): Promise<void> => {
    try{
        const arrBeepers = await gatAllBeepersService();
        res.status(200).json({ beepers: arrBeepers });  
    }
    catch(error: any){
        res.status(500).json({error: "There is a problem with the beeperService"});
    }
} 


export const getDetailsOfASpecificBeeper = async (req:Request, res:Response): Promise<void> => {
    try{
        const beeperId = req.params.id;
        if(!beeperId){
            res.status(400).json({error: "beeperId not found"});
        }
        const beeper = await getBeeperById(beeperId);
        res.status(200).json({ "beeper by id": beeper })
    }
    catch(error: any){
        res.status(500).json({error: "There is a problem with the beeperService"});
    }
}