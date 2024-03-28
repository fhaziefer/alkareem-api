import express from 'express';
import userController from '../controller/user-controller.js';
import bodyParser from 'body-parser';

const publicRouter = new express.Router();

publicRouter.use(bodyParser.urlencoded({extended:true}))

publicRouter.post('/register', userController.userRegister);
publicRouter.post('/login', userController.userLogin);

export {
    publicRouter
}