import express from 'express';
import userController from '../controller/user-controller.js';
import profileController from '../controller/profile-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//* USER ROUTE

userRouter.get('/user/current', userController.userGet);
userRouter.get('/user', userController.userGetAll);
userRouter.patch('/user/current', userController.userUpdate);
userRouter.delete('/logout', userController.userLogout);

//* PROFILE ROUTE

userRouter.post('/user/profile', profileController.createProfile);
userRouter.patch('/user/profile/current', profileController.updateProfile);

export {
    userRouter
}