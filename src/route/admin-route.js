import express from 'express';
import { authAdminMiddleware } from '../middleware/admin-auth-middleware.js';
import adminController from '../controller/admin-controller.js';

const adminRouter = new express.Router();

adminRouter.use(authAdminMiddleware);

//* STATIC FOLDER FOR ADMIN ROLE
adminRouter.use('/', express.static('public'));

//* ENDPOINT FOR ADMIN ROLE
adminRouter.get('/admin/user/search', adminController.userSearchAdmin);
adminRouter.get('/admin/user/:id', adminController.userGetByIdAdmin);
adminRouter.patch('/admin/user/:id', adminController.userUpdateAdmin);
adminRouter.patch('/admin/user/profil/:id', adminController.profileUpdateAdmin);
adminRouter.patch('/admin/user/profil/contact/:id', adminController.contactUpdateAdmin);
adminRouter.patch('/admin/user/profil/address/:id', adminController.addressUpdateAdmin);

export{
    adminRouter
}