import express from 'express';
import { sendOTP,verifyOTP,getProfile } from '../controllers/authController';
import {protect} from '../middleware/authMiddleware'

const router = express.Router();

router.post('/send-otp',sendOTP);
router.post('/verify-otp',verifyOTP);
router.get('/profile',protect, getProfile);

export default router;