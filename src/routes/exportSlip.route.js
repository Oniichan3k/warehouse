import express from 'express';

import validate from '@/middlewares/validate.middleware.js';
import exportSlipController from '@/controllers/exportSlip.controller.js';
import exportSlipValidation from '@/validations/exportSlip.validation.js';
import { auth } from '@/middlewares/auth.middleware.js';

const exportSlipRouter = express.Router();

exportSlipRouter.post('/createExportSlip', auth, validate(exportSlipValidation.createdExportSlip), exportSlipController.createdExportSlip);
exportSlipRouter.get('/searchExportSlips', auth, validate(exportSlipValidation.searchExportSlips), exportSlipController.searchExportSlips);
exportSlipRouter.get('/:exportSlipId', auth, validate(exportSlipValidation.getExportSlipById), exportSlipController.getExportSlipById);
exportSlipRouter.delete('/:exportSlipId', auth, validate(exportSlipValidation.deletedExportSlip), exportSlipController.deletedExportSlip);
exportSlipRouter.put('/:exportSlipId', auth, validate(exportSlipValidation.updatedStatusExportSlip), exportSlipController.updatedStatusExportSlip);
exportSlipRouter.get('/', auth, validate(exportSlipValidation.getExportSlipByType), exportSlipController.getExportSlipByType);

export default exportSlipRouter;