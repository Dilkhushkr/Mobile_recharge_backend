import express from 'express';
import { sendOTP,verifyOTP,getProfile ,logout,singup,login} from '../controllers/authController';
import {protect} from '../middleware/authMiddleware'
import {createBooking} from '../controllers/bookingController'

const router = express.Router();

router.post('/send-otp',sendOTP);
router.post('/verify-otp',verifyOTP);
router.get('/profile',protect, getProfile);
router.post('/logout', logout);
router.post('/signup', singup);
router.post('/login', login);

router.post('/create-booking', protect, createBooking as any);


export default router;