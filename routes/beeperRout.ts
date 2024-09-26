import express, {Router} from 'express';
import {createANewBeeper, gatAllBeepers, getDetailsOfASpecificBeeper, deleteASpecificBeeperById, getBeepersByStatus, updateTheStatusOfASpecificBeeper} from '../controllers/beeperController.js' 
const router: Router = express.Router();

router.route('/beepers').post(createANewBeeper).get(gatAllBeepers);
router.route('/beepers/:id').get(getDetailsOfASpecificBeeper).delete(deleteASpecificBeeperById);;
router.route('/beepers/:id/status').put(updateTheStatusOfASpecificBeeper);
router.route('/beepers/:status/status').get(getBeepersByStatus);



export default router