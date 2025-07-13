import express from 'express';
import validate from '@/middlewares/validate.middleware.js';
import suppliesController from '@/controllers/supplies.controller.js';
import suppliesValidation from '@/validations/supplies.validation.js';
import { auth } from '@/middlewares/auth.middleware.js';
import { roleMiddleware } from '@/middlewares/role.middleware.js';

const suppliesRouter = express.Router();

suppliesRouter.post('/createSupplies', auth, roleMiddleware, validate(suppliesValidation.createdSupply), suppliesController.createdSupply);
suppliesRouter.put('/updateSupplies/:supplyId', auth, roleMiddleware, validate(suppliesValidation.updatedSupply), suppliesController.updatedSupply);
suppliesRouter.delete('/deleteSupplies/:supplyId', auth, roleMiddleware, validate(suppliesValidation.deletedSupply), suppliesController.deletedSupply);
suppliesRouter.get('/getSupplyById/:type/:supplyId', auth, validate(suppliesValidation.getSupplyById), suppliesController.getSupplyById);
suppliesRouter.get('/getSupplies', auth, validate(suppliesValidation.getSupplies), suppliesController.getSupplies);
suppliesRouter.get('/searchSupply', auth, validate(suppliesValidation.searchSupply), suppliesController.searchSupply);

export default suppliesRouter;