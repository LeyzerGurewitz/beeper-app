var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBeeper, gatAllBeepersService, getBeeperById, deleteById, getBeepersByStatusService, changeStatus, addedLocationAndChangedStatusToExplode } from "../service/beeperService.js";
export const createANewBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name) {
            res.status(400).json({ error: "Name not found" });
        }
        const newBeeper = yield createBeeper(name);
        res.status(201).json({ beeper: newBeeper });
    }
    catch (error) {
        res.status(500).json({ error: "There is a problem with the beeperService" });
    }
});
export const gatAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arrBeepers = yield gatAllBeepersService();
        res.status(200).json({ beepers: arrBeepers });
    }
    catch (error) {
        res.status(500).json({ error: "There is a problem with the beeperService" });
    }
});
export const getDetailsOfASpecificBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            res.status(400).json({ error: "beeperId not found" });
        }
        const beeper = yield getBeeperById(beeperId);
        res.status(200).json({ "beeper by id": beeper });
    }
    catch (error) {
        res.status(500).json({ error: "There is a problem with the beeperService" });
    }
});
export const deleteASpecificBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            res.status(400).json({ error: "beeperId not found" });
        }
        const beeper = yield deleteById(beeperId);
        res.status(200).json({ "beeper by id": beeper });
    }
    catch (error) {
        res.status(500).json({ error: "There is a problem with the beeperService" });
    }
});
export const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        if (!status) {
            res.status(400).json({ error: "status not found" });
        }
        const beepersByStatus = yield getBeepersByStatusService(status);
        res.status(200).json({ "beepers by status": beepersByStatus });
    }
    catch (error) {
        res.status(500).json({ error: "There is a problem with the beeperService" });
    }
});
export const updateTheStatusOfASpecificBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            res.status(400).json({ error: "beeperId not found" });
            return;
        }
        const beeper = yield getBeeperById(beeperId);
        let beeperAfterChangeStatus = yield changeStatus(beeper);
        if (beeperAfterChangeStatus.status === "deployed") {
            const lon = req.body.longitude;
            const lat = req.body.latitude;
            const beeper = yield addedLocationAndChangedStatusToExplode(lon, lat, beeperAfterChangeStatus);
            res.status(200).json({ "beeper by status": beeper });
            console.log(88, beeper);
            return;
        }
        console.log(91, beeper);
        res.status(200).json({ "beeper by status": beeperAfterChangeStatus });
    }
    catch (_a) {
        res.status(500).json({ error: "There is a problem with the beeperService" });
    }
});
