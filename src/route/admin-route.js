import express from 'express';
import { authAdminMiddleware } from '../middleware/admin-auth-middleware.js';
import adminController from '../controller/admin-controller.js';
import { avatarUpload } from '../middleware/image-upload-middleware.js';
import bodyParser from 'body-parser';
import cors from 'cors'

const adminRouter = new express.Router();

adminRouter.use(bodyParser.urlencoded({extended:false}))
adminRouter.use(bodyParser.json());
adminRouter.use(cors());

adminRouter.use(authAdminMiddleware);

//* STATIC FOLDER FOR ADMIN ROLE
adminRouter.use('/', express.static('public'));

//* UPLOAD FILE

adminRouter.use(avatarUpload);

//* ENDPOINT FOR ADMIN ROLE
adminRouter.post('/admin/user', adminController.userRegisterAdmin);
adminRouter.get('/admin/user/search', adminController.userSearchAdmin);
adminRouter.get('/admin/user/:id', adminController.userGetByIdAdmin);
adminRouter.patch('/admin/user/:id', adminController.userUpdateAdmin);
adminRouter.delete('/admin/user/:id', adminController.userDeleteAdmin);
adminRouter.post('/admin/user/profil/:id', adminController.profileCreateAdmin);
adminRouter.patch('/admin/user/profil/avatar/:id', adminController.uploadAvatarProfileAdmin);
adminRouter.patch('/admin/user/profil/avatar/remove/:id', adminController.removeAvatarProfileAdmin);
adminRouter.patch('/admin/user/profil/:id', adminController.profileUpdateAdmin);
adminRouter.post('/admin/user/profil/contact/:id', adminController.contactCreateAdmin);
adminRouter.patch('/admin/user/profil/contact/:id', adminController.contactUpdateAdmin);
adminRouter.post('/admin/user/profil/address/:id', adminController.addressCreateAdmin);
adminRouter.patch('/admin/user/profil/address/:id', adminController.addressUpdateAdmin);

export{
    adminRouter
}