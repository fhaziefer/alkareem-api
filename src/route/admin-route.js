import express from 'express';
import { authAdminMiddleware } from '../middleware/admin-auth-middleware.js';
import adminController from '../controller/admin-controller.js';
import bodyParser from 'body-parser';
import cors from 'cors'

const adminRouter = new express.Router();

adminRouter.use(bodyParser.urlencoded({extended:false}))
adminRouter.use(bodyParser.json());
adminRouter.use(cors());

adminRouter.use(authAdminMiddleware);

//* ENDPOINT FOR ADMIN ROLE
adminRouter.post('/admin/user', adminController.userRegisterAdmin);
adminRouter.get('/admin/user/search', adminController.userSearchAdmin);
adminRouter.get('/admin/user/:id', adminController.userGetByIdAdmin);
adminRouter.get('/admin/user/username/:id', adminController.userGetByUsernameAdmin);
adminRouter.get('/admin/user/:id', adminController.userGetByIdAdmin);
adminRouter.patch('/admin/user/:id', adminController.userUpdateAdmin);
adminRouter.delete('/admin/user/:id', adminController.userDeleteAdmin);
adminRouter.get('/admin/user/profile/:id', adminController.getProfileByIdAdmin);
adminRouter.get('/admin/user/profile/bani/:id', adminController.getBaniProfileAdmin);
adminRouter.post('/admin/user/profile/bani/:id', adminController.addBaniProfileAdmin);
adminRouter.delete('/admin/user/profile/bani/:id/:baniId', adminController.deleteBaniProfileAdmin);
adminRouter.post('/admin/user/profile/:id', adminController.profileCreateAdmin);
adminRouter.patch('/admin/user/profile/avatar/:id', adminController.uploadAvatarProfileAdmin);
adminRouter.patch('/admin/user/profile/avatar/remove/:id', adminController.removeAvatarProfileAdmin);
adminRouter.patch('/admin/user/profile/:id', adminController.profileUpdateAdmin);
adminRouter.post('/admin/user/profile/contact/:id', adminController.contactCreateAdmin);
adminRouter.get('/admin/user/profile/contact/:id', adminController.getContactByIdAdmin);
adminRouter.patch('/admin/user/profile/contact/:id', adminController.contactUpdateAdmin);
adminRouter.post('/admin/user/profile/address/:id', adminController.addressCreateAdmin);
adminRouter.get('/admin/user/profile/address/:id', adminController.getAddressByIdAdmin);
adminRouter.patch('/admin/user/profile/address/:id', adminController.addressUpdateAdmin);

export{
    adminRouter
}