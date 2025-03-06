import { ResponseError } from "../error/response-error.js";
import profileService from "../service/profile-service.js";

const createProfile = async (req, res, next) => {

    try {
        const user = req.user;
        const request = req.body;

        const result = await profileService.createProfile(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }

}

const getProfile = async (req, res, next) => {

    try {
        const user = req.user;
        const result = await profileService.getProfile(user);
        res.status(200).json({
            data: result
        });
        
    } catch (e) {
        next(e);
    }

}

const updateProfile = async (req, res, next) => {

    try {
        const user = req.user;
        const request = req.body;

        const result = await profileService.updateProfile(user, request);
        res.status(200).json({
            data:result
        })

    } catch (e) {
        next(e);
    }

}

const uploadAvatarProfile = async (req, res, next) => {

    try {

        if (!req.file) {
            throw new ResponseError(401, "Please upload your images")
        }

        const user = req.user;
        var path = req.file.path;
        path = path.substring(path.indexOf("/") + 1);

        const avatar = `/${path}`

        const result = await profileService.uploadAvatarProfile(user, avatar);
        res.status(200).json({
            data:result
        })

    } catch (e) {
        next(e);
    }

}

const removeAvatarProfile = async (req, res, next) => {

    try {
        const user = req.user;
        const result = await profileService.removeAvatarProfile(user);
        res.status(200).json({
            data:result
        })

    } catch (e) {
        next(e);
    }

}

const deleteProfile = async (req, res, next) => {
    try {
        const user = req.user;
        await profileService.deleteProfile(user);
        res.status(200).json({
            data: "Profile is deleted sucessfully"
        })
    } catch (e) {
        next(e)
    }
}

const addBaniProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body

        const result = await profileService.addBaniProfile(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getBaniProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await profileService.getBaniProfile(user);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const searchProfile = async (req,res,next) => {
    try {
        const result = await profileService.searhProfile(req.query.keyword)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const searchProfileParent = async (req,res,next) => {
    try {
        const request = {
            query: req.query.keyword,
            generasi: req.query.generasi,
        };
        const result = await profileService.searhProfileParent(request)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const searchProfileHusband = async (req,res,next) => {
    try {
        const request = {
            query: req.query.keyword,
            gender: 'MALE',
            generasi: req.query.generasi,
        };
        const result = await profileService.searhProfileHusband(request)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const deleteBaniProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.params.id

        await profileService.deleteBaniProfile(user, request);
        res.status(200).json({
            data: "Bani is deleted successfully" 
        })
    } catch (e) {
        next(e)
    }
}

const updateNumberProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body.number
        await profileService.updateNumberProfile(user, request);
        res.status(200).json({
            data: "Number of profile is updated successfully"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    createProfile,
    getProfile,
    updateProfile,
    uploadAvatarProfile,
    removeAvatarProfile,
    deleteProfile,
    addBaniProfile,
    getBaniProfile,
    searchProfile,
    searchProfileParent,
    searchProfileHusband,
    updateNumberProfile,
    deleteBaniProfile
}