import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/user/current', userController.userGet);
userRouter.get('/user', userController.userGetAll);
userRouter.patch('/user/current', userController.userUpdate);
userRouter.delete('/user/logout', userController.userLogout);

export {
    userRouter
}