import express from 'express';

import validate from '@/middlewares/validate.middleware.js';
import importSlipController from '@/controllers/importSlip.controller.js';
import importSlipValidation from '@/validations/importSlip.validation.js';
import { auth } from '@/middlewares/auth.middleware.js';

const importSlipRouter = express.Router();

importSlipRouter.post('/createImportSlip', auth, validate(importSlipValidation.createdImportSlip), importSlipController.createdImportSlip);
importSlipRouter.get('/searchImportSlips', auth, validate(importSlipValidation.searchImportSlips), importSlipController.searchImportSlips);
importSlipRouter.get('/', auth, validate(importSlipValidation.getImportSlipByType), importSlipController.getImportSlipByType);
importSlipRouter.get('/:importSlipId', auth, validate(importSlipValidation.getImportSlipById), importSlipController.getImportSlipById);
importSlipRouter.delete('/:importSlipId', auth, validate(importSlipValidation.deletedImportSlip), importSlipController.deletedImportSlip);
importSlipRouter.put('/:importSlipId', auth, validate(importSlipValidation.updatedStatusImportSlip), importSlipController.updatedStatusImportSlip);

export default importSlipRouter;
