import express from 'express';

import validate from '@/middlewares/validate.middleware.js';
import contractController from '@/controllers/contract.controller.js';
import contractValidation from '@/validations/contract.validation.js';
import { auth } from '@/middlewares/auth.middleware.js';
import upload from '@/middlewares/upload.middleware.js';
import uploadFiles from '@/controllers/upload.controller.js';

const contractRouter = express.Router();

contractRouter.post('/createdContract', auth, upload.array('contractMedia', 10), uploadFiles, validate(contractValidation.createdContract), contractController.createdContract);

export default contractRouter;