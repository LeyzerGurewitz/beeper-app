import { readUsersFromFile, writeUsersToFile } from "../DAL/jsonBeeper.js";
import {Beeper, Status} from "../models/beeperModel.js";
import {v4 as uuidv4} from "uuid";
// import bcrypt from "bcrypt";


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

export const  getBeeperById = async (beeperId:string): Promise<Beeper | void> => {
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

