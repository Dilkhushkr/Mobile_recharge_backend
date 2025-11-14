import express from  "express";
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({

  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],

}))

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});


app.use('/api/auth',authRoutes);

export default app;
