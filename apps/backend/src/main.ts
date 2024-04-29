import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import accountRouter from './routes/account';
import userRouter from './routes/users';

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.DATABASE_URL ?? "";

const app = express();

app.use(cors());

app.use(cookieSession({
  name: 'session',
  keys: ['k1', 'k2'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(bodyParser.json());


mongoose.connect(MONGO_URI)
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
  });

// define root route
app.get('/api/hello', (_, res) => {
  return res.json({ message: 'Hello, frontend!' });
});

// account routes
app.use('/api/account', accountRouter);

// user routes
app.use('/api/user', userRouter);

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
