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

export default {
    createProfile,
    getProfile,
    updateProfile,
    uploadAvatarProfile,
    removeAvatarProfile
}