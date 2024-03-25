import express from 'express';
import userController from '../controller/user-controller.js';
import profileController from '../controller/profile-controller.js';
import contactController from '../controller/contact-controller.js';
import addressController from '../controller/address-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { avatarUpload } from '../middleware/image-upload-middleware.js';

const userRouter = new express.Router();

//! AUTHORIZATION

userRouter.use(authMiddleware);

//!--------------

//* STATIC FILE

userRouter.use('/', express.static('public'));

//*--------------

//* UPLOAD FILE

userRouter.use(avatarUpload);

//*--------------

//* USER ROUTE

userRouter.get('/user/current', userController.userGet);
userRouter.patch('/user/current', userController.userUpdate);
userRouter.delete('/logout', userController.userLogout);

//*--------------

//* PROFILE ROUTE

userRouter.post('/user/profile', profileController.createProfile);
userRouter.patch('/user/profile/avatar/current', profileController.uploadAvatarProfile);
userRouter.patch('/user/profile/avatar/current/remove', profileController.removeAvatarProfile);
userRouter.get('/user/profile/current', profileController.getProfile);
userRouter.patch('/user/profile/current', profileController.updateProfile);
userRouter.delete('/user/profile/current', profileController.deleteProfile);

//*--------------

//* CONTACT ROUTE

userRouter.post('/user/profile/contact', contactController.createContact);
userRouter.get('/user/profile/contact/current', contactController.getContact);
userRouter.patch('/user/profile/contact/current', contactController.updateContact);
userRouter.delete('/user/profile/contact/current', contactController.deleteContact);

//*--------------

//* ADDRESS ROUTE

userRouter.post('/user/profile/address', addressController.createAddress);
userRouter.get('/user/profile/address/current', addressController.getAddress);
userRouter.patch('/user/profile/address/current', addressController.updateAddress);
userRouter.delete('/user/profile/address/current', addressController.deleteAddress);

//*--------------

export {
    userRouter
}