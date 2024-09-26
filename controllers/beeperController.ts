import { Request, Response } from "express";
import {createBeeper, gatAllBeepersService, getBeeperById, deleteById, getBeepersByStatusService, changeStatus, addedLocationAndChangedStatusToExplode } from "../service/beeperService.js";
import {Beeper} from "../models/beeperModel.js";
import { count, error, log } from "console";

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

export const deleteASpecificBeeperById = async(req:Request, res:Response): Promise<void> => {
    try{
        const beeperId = req.params.id;
        if(!beeperId){
            res.status(400).json({error: "beeperId not found"});
        }
        const beeper = await deleteById(beeperId);
        res.status(200).json({ "beeper by id": beeper })
    }
    catch(error: any){
        res.status(500).json({error: "There is a problem with the beeperService"});
    }
}

export const getBeepersByStatus = async (req:Request, res:Response): Promise<void> => {
    try{
        const status = req.params.status;
        if(!status){
            res.status(400).json({error: "status not found"});
        }
        const beepersByStatus = await getBeepersByStatusService(status);
        res.status(200).json({ "beepers by status": beepersByStatus })
    }
    catch(error: any){
        res.status(500).json({error: "There is a problem with the beeperService"});
    }
}
   
export const updateTheStatusOfASpecificBeeper = async(req:Request, res:Response): Promise<void> => {
        try{
            const beeperId = req.params.id;
            if(!beeperId){
                res.status(400).json({error: "beeperId not found"});
                return;
            }
            const beeper = await getBeeperById(beeperId);
            let beeperAfterChangeStatus = await changeStatus(beeper)

            if(beeperAfterChangeStatus.status === "deployed"){
                const lon = req.body.longitude;
                const lat = req.body.latitude;
                const beeper = await addedLocationAndChangedStatusToExplode(lon, lat, beeperAfterChangeStatus);
                res.status(200).json({ "beeper by status": beeper })
                console.log(88 ,beeper)
                return;
            }
            console.log(91 ,beeper)
            res.status(200).json({ "beeper by status": beeperAfterChangeStatus })

    }
    catch{
        res.status(500).json({error: "There is a problem with the beeperService"});
    }
}
  