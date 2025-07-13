import express from "express";
import validate from "@/middlewares/validate.middleware.js";
import generalStatisticsValidation from "@/validations/generalStatistics.validation.js";
import generalStatisticsController from "@/controllers/generalStatistics.controller.js";
import {auth} from "@/middlewares/auth.middleware.js";

const generalStatisticsRouter = express.Router();

generalStatisticsRouter.get(
  "/import-export-ratio",
  auth,
  validate(generalStatisticsValidation.importExportRatio),
  generalStatisticsController.importExportRatio
);

generalStatisticsRouter.get(
  "/export-with-source",
  auth,
  validate(generalStatisticsValidation.exportWithSource),
  generalStatisticsController.exportWithSource
);

generalStatisticsRouter.get(
  "/import-with-source",
  auth,
  validate(generalStatisticsValidation.importWithSource),
  generalStatisticsController.importWithSource
);

export default generalStatisticsRouter;
