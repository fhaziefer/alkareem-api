
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

export default {
    createProfile,
    getProfile,
    updateProfile
}