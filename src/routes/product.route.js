import express from 'express';

import validate from '@/middlewares/validate.middleware.js';
import productController from '@/controllers/product.controller.js';
import productValidation from '@/validations/product.validation.js';
import { auth } from '@/middlewares/auth.middleware.js';
import upload from '@/middlewares/upload.middleware.js';
import { roleMiddleware } from '@/middlewares/role.middleware.js';
import uploadFiles from '@/controllers/upload.controller.js';

const productRouter = express.Router();

productRouter.post('/createdProduct', auth, roleMiddleware, upload.array('productMedia', 10), uploadFiles, validate(productValidation.createdProduct), productController.createdProduct);
productRouter.put('/updatedProduct/:productId', auth, roleMiddleware, validate(productValidation.updatedProduct), productController.updatedProduct);
productRouter.delete('/deleteProduct/:productId', auth, roleMiddleware, validate(productValidation.deleteProduct), productController.deleteProduct);
productRouter.get('/getProductById/:productId', auth, validate(productValidation.getProductById), productController.getProductById);
productRouter.get('/getProducts', auth, validate(productValidation.getProducts), productController.getProducts);
productRouter.get('/searchProduct', auth, validate(productValidation.searchProduct), productController.searchProduct);

export default productRouter;