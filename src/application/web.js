import express from 'express';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../route/user-route.js';
import { adminRouter } from '../route/admin-route.js';

export const web = express();

web.use(express.json());

web.use(publicRouter);
web.use(userRouter);
web.use(adminRouter);

web.use(errorMiddleware);