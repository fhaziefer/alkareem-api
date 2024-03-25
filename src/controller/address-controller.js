import addressService from "../service/address-service.js";

const createAddress = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await addressService.createAddress(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getAddress = async (req, res, next) => {
    try {
        const user = req.user;
        
        const result = await addressService.getAddress(user);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const updateAddress = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await addressService.updateAddress(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const deleteAddress = async (req, res, next) => {
    try {
        const user = req.user;
        await addressService.deleteAddress(user);
        res.status(200).json({
            data: "Address is deleted successfully"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    createAddress,
    getAddress,
    updateAddress,
    deleteAddress
}