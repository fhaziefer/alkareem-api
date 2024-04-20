import multer from 'multer';
import {v4 as uuid} from 'uuid';

export const TYPE_IMAGE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
};

const fileFilter = (req, file, cb) => {

    const acceptMime = Object.keys(TYPE_IMAGE);

    if (!acceptMime.includes(file.mimetype)) {
        cb({ message: "File not accepted, please use JPG, JPEG, or PNG file" }, false);
    } else {
      cb(null, true);
    }
};

const avatarStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images/avatar');
    },
    filename: (req, file, cb) => {
        const name = uuid().toString()
        const ext = TYPE_IMAGE[file.mimetype];
        cb(null, `images-alkareem-avatar-${name}.${ext}` )
    }
});

const maxSize = 1 * 1024 * 1024; //1MB

const avatarUpload = multer({
    storage: avatarStorage, 
    fileFilter: fileFilter, 
    limits: {fileSize: maxSize}
}).single('avatar');

const adminAvatarUpload = multer({
    storage: avatarStorage, 
    fileFilter: fileFilter, 
    limits: {fileSize: maxSize}
}).single('avatar');

export {
    adminAvatarUpload,
    avatarUpload
}