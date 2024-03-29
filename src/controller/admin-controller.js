import { logger } from "../application/logging.js"
import adminService from "../service/admin-service.js"

const userRegisterAdmin = async (req, res, next) => {
    try {
        const result = await userService.userRegisterAdmin(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const userSearchAdmin = async (req, res, next) => {
    try {
        const request = {
            query: req.query.keyword,
            page: req.query.page,
            size: req.query.size
        }
        const result = await adminService.userSearchAdmin(request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
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

const userDeleteAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        await adminService.userDeleteAdmin(userId);
        res.status(200).json({
            data: "User deleted successfully"
        })
    } catch (e) {
        next(e)
    }
}

const profileCreateAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const profilData = req.body
        const result = await adminService.profileCreateAdmin(userId, profilData)
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

const uploadAvatarProfileAdmin = async (req, res, next) => {
    try {

        if (!req.file) {
            throw new ResponseError(401, "Please upload your images")
        }

        const userId = req.params.id;
        var path = req.file.path;
        path = path.substring(path.indexOf("/") + 1);

        const avatar = `/${path}`

        const result = await profileService.uploadAvatarProfile(userId, avatar);
        res.status(200).json({
            data:result
        })

    } catch (e) {
        next(e);
    }
}

const removeAvatarProfileAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await profileService.removeAvatarProfile(userId);
        res.status(200).json({
            data:result
        })

    } catch (e) {
        next(e);
    }
}

const contactCreateAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const contactData = req.body
        const result = await adminService.contactCreateAdmin(userId, contactData)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
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

const addressCreateAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const addressData = req.body
        const result = await adminService.addressCreateAdmin(userId, addressData)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
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
    userRegisterAdmin,
    userSearchAdmin,
    userGetByIdAdmin,
    userUpdateAdmin,
    userDeleteAdmin,
    profileCreateAdmin,
    profileUpdateAdmin,
    uploadAvatarProfileAdmin,
    removeAvatarProfileAdmin,
    contactCreateAdmin,
    contactUpdateAdmin,
    addressCreateAdmin,
    addressUpdateAdmin
}