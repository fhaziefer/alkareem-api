import express from 'express';
import userController from '../controller/user-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/register', userController.userRegister);
publicRouter.post('/login', userController.userLogin);

export {
    publicRouter
}