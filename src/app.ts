import express from  "express";
import authRoutes from './routes/authRoutes';
import  createBookingRoutes  from "./routes/CreateBookingRoutes";
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(cors({

  origin: [
    "http://localhost:5173",
    "https://adityacar1.netlify.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],

}))

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});



app.use('/api/auth',authRoutes);
app.use('/api/booking', createBookingRoutes);


export default app;
