import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRouter from 'routes/authRouter';
import dietRouter from 'routes/dietRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/diet', dietRouter);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || 500;
    const message = err.message || 'Server error';
    res.status(status).json({ message });
  }
);

export default app;
