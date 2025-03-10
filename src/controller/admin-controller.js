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

const userGetByUsernameAdmin = async (req, res, next) => {
    try {
        const request = req.params.id
        const result = await adminService.userGetByUsernameAdmin(request)
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

        const result = await adminService.uploadAvatarProfileAdmin(userId, avatar);
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
        const result = await adminService.removeAvatarProfileAdmin(userId);
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

const getProfileByIdAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const result = await adminService.getProfileByIdAdmin(userId)
        res.status(200).json({
            data: result
        })
        
    } catch (e) {
        next(e);
    }
}

const getBaniProfileAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const result = await adminService.getBaniProfileAdmin(userId)
        res.status(200).json({
            data: result
        })
        
    } catch (e) {
        next(e);
    }
}

const getContactByIdAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const result = await adminService.getContactByIdAdmin(userId)
        res.status(200).json({
            data: result
        })
        
    } catch (e) {
        next(e);
    }
}

const getAddressByIdAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const result = await adminService.getAddressByIdAdmin(userId)
        res.status(200).json({
            data: result
        })
        
    } catch (e) {
        next(e);
    }
}

const addBaniProfileAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const request = req.body

        const result = await adminService.addBaniProfileAdmin(userId, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const deleteBaniProfileAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const request = req.params.baniId

        await adminService.deleteBaniProfileAdmin(userId, request);
        res.status(200).json({
            data: "Bani is deleted successfully" 
        })
    } catch (e) {
        next(e)
    }
}

const updateNumberProfileAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const profilData = req.body.number
        await adminService.profileNumberUpdateAdmin(userId, profilData);
        res.status(200).json({
            data: "Number of profile is updated successfully"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    userRegisterAdmin,
    userSearchAdmin,
    userGetByIdAdmin,
    userGetByUsernameAdmin,
    userUpdateAdmin,
    userDeleteAdmin,
    getProfileByIdAdmin,
    getBaniProfileAdmin,
    getContactByIdAdmin,
    getAddressByIdAdmin,
    addBaniProfileAdmin,
    updateNumberProfileAdmin,
    deleteBaniProfileAdmin,
    profileCreateAdmin,
    profileUpdateAdmin,
    uploadAvatarProfileAdmin,
    removeAvatarProfileAdmin,
    contactCreateAdmin,
    contactUpdateAdmin,
    addressCreateAdmin,
    addressUpdateAdmin
}