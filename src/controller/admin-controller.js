import { logger } from "../application/logging.js"
import adminService from "../service/admin-service.js"

const userSearchAdmin = async (req, res, next) => {
    try {
        const request = req.query.keyword
        const result = await adminService.userSearchAdmin(request)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const userGetByIdAdmin = async (req, res, next) => {
    try {
        const request = req.params.id
        const result = await adminService.userGetByIdAdmin(request)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e) 
    }
}

const userUpdateAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = req.body
        const result = await adminService.userUpdateAdmin(userId, user)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const profileUpdateAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const profilData = req.body
        const result = await adminService.profileUpdateAdmin(userId, profilData)
        res.status(200).json({
            data: result
        })
        
    } catch (e) {
        next(e);
    }
}

const contactUpdateAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const contactData = req.body
        const result = await adminService.contactUpdateAdmin(userId, contactData)
        res.status(200).json({
            data: result
        })
        
    } catch (e) {
        next(e);
    }
}

const addressUpdateAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const addressData = req.body
        const result = await adminService.addressUpdateAdmin(userId, addressData)
        res.status(200).json({
            data: result
        })
        
    } catch (e) {
        next(e);
    }
}

export default {
    userSearchAdmin,
    userGetByIdAdmin,
    userUpdateAdmin,
    profileUpdateAdmin,
    contactUpdateAdmin,
    addressUpdateAdmin
}