import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { customMorganFormat } from '@utils/logging';

const loadMiddlewares = (app) => {
  app.use(morgan(customMorganFormat));
  app.use(helmet());
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default loadMiddlewares;
