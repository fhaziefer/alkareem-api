import express from 'express';
import userController from '../controller/user-controller.js';
import bodyParser from 'body-parser';
import cors from 'cors'

const publicRouter = new express.Router();

publicRouter.use(bodyParser.urlencoded({extended:false}))
publicRouter.use(bodyParser.json());
publicRouter.use(cors());

//* STATIC FILE

publicRouter.use('/', express.static('public'));

//*--------------

publicRouter.post('/register', userController.userRegister);
publicRouter.post('/login', userController.userLogin);

export {
    publicRouter
}