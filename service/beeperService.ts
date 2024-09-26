import { readUsersFromFile, writeUsersToFile } from "../DAL/jsonBeeper.js";
import {Beeper, Status} from "../models/beeperModel.js";
import {coordinates} from "../models/arrLocation.js";
import {v4 as uuidv4} from "uuid";

const arrLocation = coordinates;
const ArrStatus = [
    Status.manufactured, 
    Status.assembled,
    Status.shipped,
    Status.deployed,
    Status.detonated
]

export const createBeeper = async (beeperName: string): Promise<Beeper | void> =>{
    const beepers: Beeper[] = await readUsersFromFile();
    if(!beeperName){
        throw new Error("beeper does not exist")
    }
    const newId: string = uuidv4();

    const newBeeper: Beeper = {
        id: newId,
        name: beeperName,
        status: Status.manufactured,
        createAt: new Date(),
    }
    beepers.push(newBeeper);
    await writeUsersToFile(beepers);
    return newBeeper;
}


export const gatAllBeepersService = async (): Promise<Beeper[] | void> => {
    const beepers: Beeper[] = await readUsersFromFile();
    if(!beepers){
        throw new Error("beepers does not exist")
    }
    return beepers;
}

export const  getBeeperById = async (beeperId:string): Promise<Beeper> => {
    const beepers: Beeper[] = await readUsersFromFile();
    if(!beepers){
        throw new Error("beepers does not exist")
    }
    const beeper = beepers.find(b => b.id === beeperId);
    if(!beeper){
        throw new Error("The beeper was not found");
    }
    return beeper;
}

export const deleteById = async(beeperId:string): Promise<Beeper | void> => {
    const beepers: Beeper[] = await readUsersFromFile();
    if(!beepers){
        throw new Error("beepers does not exist")
    }
    const beeper = beepers.find(b => b.id === beeperId);
    if(!beeper){
        throw new Error("The beeper was not found");
    }
    const index = beepers.findIndex(b => b.id === beeperId)
    if(index === -1){
        throw new Error("No index found")
    }
    beepers.splice(index, 1)
    await writeUsersToFile(beepers);
    return beeper;
}

export const getBeepersByStatusService = async (status:string): Promise<Beeper[] | void> => {
    const beepers: Beeper[] = await readUsersFromFile();
    if(!beepers){
        throw new Error("beepers does not exist")
    }
    const beeperByStatus = beepers.filter(b => b.status === status);
    if(!beeperByStatus){
        throw new Error("The beepers status was not found");
    }
    return beeperByStatus;
}

export const editBeeperToDBJson = async (beeper:Beeper): Promise<Beeper> => {
    const beepers: Beeper[] = await readUsersFromFile();
    if(!beepers){
        throw new Error("beepers does not exist")
    }
    const editBeeper = beepers.find(b => b.id === beeper.id);
    if(!editBeeper){
        throw new Error("The beeper was not found");
    }
    editBeeper.status = beeper.status
    if(beeper.latitude && beeper.longitude && beeper.detonatedAt){
    editBeeper.latitude = beeper.latitude
    editBeeper.longitude = beeper.longitude
    editBeeper.detonatedAt = beeper.detonatedAt
    }
    await writeUsersToFile(beepers);
    return beeper;
}


export const changeStatus = async(beeper:Beeper): Promise<Beeper> => {
   const indexBeeper = ArrStatus.findIndex(s =>  s === beeper.status)
   if(indexBeeper === -1){
        throw new Error("No index found")
   }
   if(indexBeeper < ArrStatus.length){
        beeper.status = ArrStatus[indexBeeper +1]
    }
    editBeeperToDBJson(beeper);
    return beeper;
}

export const addedLocationAndChangedStatusToExplode= async(lon:string, lat:string, beeper:Beeper): Promise<Beeper> => {
    const latInt = parseFloat(lat)
    const lonInt = parseFloat(lon)
    const location = arrLocation.find(l => l.lon === lonInt && l.lat ===latInt);
    if(!location){
        throw new Error("The waypoint is incorrect");
    }
    beeper.latitude = latInt
    beeper.longitude = lonInt

    setTimeout(() => {
        beeper.status = Status.detonated;
        beeper.detonatedAt = new Date();
        editBeeperToDBJson(beeper);
        
    },10000)
    return beeper;
}