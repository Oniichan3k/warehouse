import express from "express";

import validate from "../middlewares/validate.middleware.js";
import reportController from "../controllers/report.controller.js";
import reportValidation from "../validations/report.validation.js";
import { auth } from "../middlewares/auth.middleware.js";


const reportRouter = express.Router();

reportRouter.get(
  "/import-export-inventory",
  auth,
  validate(reportValidation.reportExportImportInventory),
  reportController.reportExportImportInventory
);

export default reportRouter;