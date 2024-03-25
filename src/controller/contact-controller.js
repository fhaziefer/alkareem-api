import contactService from "../service/contact-service.js";

const createContact = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await contactService.createContact(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getContact = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await contactService.getContact(user);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await contactService.updateContact(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const user = req.user;
        await contactService.deleteContact(user);
        res.status(200).json({
            data: "Contact is deleted sucessfully"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    createContact,
    getContact,
    updateContact,
    deleteContact
}