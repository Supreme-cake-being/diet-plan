import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRouter from './routes/authRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);

export default app;
