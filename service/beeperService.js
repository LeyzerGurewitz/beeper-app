var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readUsersFromFile, writeUsersToFile } from "../DAL/jsonBeeper.js";
import { Status } from "../models/beeperModel.js";
import { coordinates } from "../models/arrLocation.js";
import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcrypt";
const arrLocation = coordinates;
const ArrStatus = [
    Status.manufactured,
    Status.assembled,
    Status.shipped,
    Status.deployed,
    Status.detonated
];
export const createBeeper = (beeperName) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readUsersFromFile();
    if (!beeperName) {
        throw new Error("beeper does not exist");
    }
    const newId = uuidv4();
    const newBeeper = {
        id: newId,
        name: beeperName,
        status: Status.manufactured,
        createAt: new Date(),
    };
    beepers.push(newBeeper);
    yield writeUsersToFile(beepers);
    return newBeeper;
});
export const gatAllBeepersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readUsersFromFile();
    if (!beepers) {
        throw new Error("beepers does not exist");
    }
    return beepers;
});
export const getBeeperById = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readUsersFromFile();
    if (!beepers) {
        throw new Error("beepers does not exist");
    }
    const beeper = beepers.find(b => b.id === beeperId);
    if (!beeper) {
        throw new Error("The beeper was not found");
    }
    return beeper;
});
export const deleteById = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readUsersFromFile();
    if (!beepers) {
        throw new Error("beepers does not exist");
    }
    const beeper = beepers.find(b => b.id === beeperId);
    if (!beeper) {
        throw new Error("The beeper was not found");
    }
    const index = beepers.findIndex(b => b.id === beeperId);
    if (index === -1) {
        throw new Error("No index found");
    }
    beepers.splice(index, 1);
    yield writeUsersToFile(beepers);
    return beeper;
});
export const getBeepersByStatusService = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readUsersFromFile();
    if (!beepers) {
        throw new Error("beepers does not exist");
    }
    const beeperByStatus = beepers.filter(b => b.status === status);
    if (!beeperByStatus) {
        throw new Error("The beepers status was not found");
    }
    return beeperByStatus;
});
export const editBeeperToDBJson = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readUsersFromFile();
    if (!beepers) {
        throw new Error("beepers does not exist");
    }
    const editBeeper = beepers.find(b => b.id === beeper.id);
    if (!editBeeper) {
        throw new Error("The beeper was not found");
    }
    editBeeper.status = beeper.status;
    if (beeper.latitude && beeper.longitude && beeper.detonatedAt) {
        editBeeper.latitude = beeper.latitude;
        editBeeper.longitude = beeper.longitude;
        editBeeper.detonatedAt = beeper.detonatedAt;
    }
    yield writeUsersToFile(beepers);
    return beeper;
});
export const changeStatus = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const indexBeeper = ArrStatus.findIndex(s => s === beeper.status);
    if (indexBeeper === -1) {
        throw new Error("No index found");
    }
    if (indexBeeper < ArrStatus.length) {
        beeper.status = ArrStatus[indexBeeper + 1];
    }
    editBeeperToDBJson(beeper);
    return beeper;
});
export const addedLocationAndChangedStatusToExplode = (lon, lat, beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const latInt = parseFloat(lat);
    const lonInt = parseFloat(lon);
    const location = arrLocation.find(l => l.lon === lonInt && l.lat === latInt);
    if (!location) {
        throw new Error("The waypoint is incorrect");
    }
    beeper.latitude = latInt;
    beeper.longitude = lonInt;
    setTimeout(() => {
        beeper.status = Status.detonated;
        beeper.detonatedAt = new Date();
        editBeeperToDBJson(beeper);
    }, 10000);
    return beeper;
});
