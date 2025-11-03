import express from 'express';
import { sendOTP } from '../controllers/authController';

const router = express.Router();

router.post('/send-otp',sendOTP);

export default router;