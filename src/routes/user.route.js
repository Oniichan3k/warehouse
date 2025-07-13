
import express from 'express';

import validate from '../middlewares/validate.middleware.js';

import userController from '../controllers/user.controller.js';
import userValidation from '../validations/user.validation.js';
import { auth } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';
// import uploadFiles from '../controllers/upload.controller.js';
const userRouter = express.Router();

userRouter.post('/register', validate(userValidation.register), userController.register);
userRouter.post('/verify-otp', validate(userValidation.verifyOTP), userController.verifyOTP);
userRouter.post('/resend-otp', validate(userValidation.resendOTP), userController.resendOTP);
userRouter.post('/login', validate(userValidation.login), userController.login);
userRouter.post('/refresh-token', validate(userValidation.getRefreshToken), userController.getRefreshToken);
userRouter.get('/:userId', auth,  validate(userValidation.getUserById), userController.getUserById);
userRouter.put('/update-password', validate(userValidation.updatePassword), userController.updatePassword);
userRouter.post('/forgot-password', validate(userValidation.forgotPassword), userController.forgotPassword);
userRouter.put('/edit-profile/:userId', auth, validate(userValidation.editProfile), userController.editProfile);
userRouter.post('/upload-avatar/:userId', auth, upload.single('avatar'), validate(userValidation.uploadAvatar), userController.uploadAvatar);

export default userRouter;