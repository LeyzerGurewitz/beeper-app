var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';
export const readUsersFromFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonfile.readFile(DB_FILE_PATH);
    }
    catch (err) {
        console.error(err);
        return [];
    }
});
export const writeUsersToFile = (beepers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jsonfile.writeFile(DB_FILE_PATH, beepers);
    }
    catch (err) {
        console.error(err);
    }
});
