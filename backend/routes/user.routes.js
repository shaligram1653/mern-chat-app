import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
const router=express.Router();
import { getUsersForSidebar } from '../controllers/user.controller.js';

router.get("/",protectRoute,getUsersForSidebar);



export default router;

