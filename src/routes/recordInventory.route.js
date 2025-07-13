import express from "express";

import validate from "../middlewares/validate.middleware.js";
import recordInventoryController from "../controllers/recordInventory.controller.js";
import recordInventoryValidation from "../validations/recordInventory.validation.js";
import { auth } from "../middlewares/auth.middleware.js";

const recordInventoryRouter = express.Router();

recordInventoryRouter.post(
  "/createdInventory",
  auth,
  validate(recordInventoryValidation.createdRecordInventory),
  recordInventoryController.createdRecordInventory
);

recordInventoryRouter.put(
  "/updatedStatusRecordInventory/:recordInventoryId",
  auth,
  validate(recordInventoryValidation.updatedStatusRecordInventoryy),
  recordInventoryController.updatedStatusRecordInventory
);

recordInventoryRouter.delete(
  "/deleteRecordInventory/:recordInventoryId",
  auth,
  validate(recordInventoryValidation.deletedRecordInventory),
  recordInventoryController.deletedRecordInventory
);

recordInventoryRouter.get(
  "/getRecordInventoryById/:recordInventoryId",
  auth,
  validate(recordInventoryValidation.getRecordInventoryById),
  recordInventoryController.getRecordInventoryById
);

recordInventoryRouter.get(
  "/getRecordInventories",
  auth,
  validate(recordInventoryValidation.getRecordInventories),
  recordInventoryController.getRecordInventories
);

recordInventoryRouter.get(
  "/searchRecordInventory",
  auth,
  validate(recordInventoryValidation.searchRecordInventory),
  recordInventoryController.searchRecordInventory
);

export default recordInventoryRouter;
