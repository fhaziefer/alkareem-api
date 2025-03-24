import express from "express";
import userController from "../controller/user-controller.js";
import bodyParser from "body-parser";
import cors from "cors";
import { avatarUpload } from "../middleware/image-upload-middleware.js";
import path from "path";

const publicRouter = new express.Router();

publicRouter.use(bodyParser.urlencoded({ extended: false }));
publicRouter.use(bodyParser.json());
publicRouter.use(cors());
publicRouter.use(avatarUpload);

//* STATIC FILE

publicRouter.use("/", express.static("public"));

//*--------------
publicRouter.post("/register", userController.userRegister);
publicRouter.post("/login", userController.userLogin);
publicRouter.get("/total-users", userController.userGetTotal);


// Home route
publicRouter.get("/", (req, res) => {
  res.sendFile(path.resolve("public/files/index.html"));
});


export { publicRouter };
