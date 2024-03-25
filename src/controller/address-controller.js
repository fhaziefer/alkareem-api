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

export default {
    createAddress
}