import httpStatus from "http-status";
import ExportSlip from "../models/exportSlip.model.js";
import ImportSlip from "../models/importSlip.model.js";
import catchAsync from "../utils/catchAsync.js";

const importExportRatio = catchAsync(async (req, res) => {
  const { timeStart, timeEnd } = req.query;

  let importQuantity = 0;
  let exportQuantity = 0;
  let importSlips;
  let exportSlips;

  if (timeStart && timeEnd) {
    const query = {};
    query.createdAt = { $gte: new Date(timeStart), $lte: new Date(timeEnd) };

    importSlips = await ImportSlip.find(query);
    exportSlips = await ExportSlip.find(query);
  } else {
    importSlips = await ImportSlip.find();
    exportSlips = await ExportSlip.find();
  }

  importSlips.forEach((importSlip) => {
    importSlip.products.forEach((product) => {
      importQuantity += product.quantity;
    });
  });

  exportSlips.forEach((exportSlip) => {
    exportSlip.products.forEach((product) => {
      exportQuantity += product.quantity;
    });
  });

  const countSlip = importSlips.length + exportSlips.length;

  return res.status(httpStatus.OK).json({
    countSlip,
    importQuantity,
    exportQuantity,
    importExportRatio: exportQuantity / importQuantity,
  });
});

const exportWithSource = catchAsync(async (req, res) => {
  const { timeStart, timeEnd } = req.query;

  let exportWithProvider = 0;
  let exportWithAgency = 0;
  let exportWithCustomer = 0;
  let returnWithAgency = 0;
  let exportSlips;
  let importSlips;

  if (timeStart && timeEnd) {
    const query = {};
    query.createdAt = { $gte: new Date(timeStart), $lte: new Date(timeEnd) };
    exportSlips = await ExportSlip.find(query);
    importSlips = await ImportSlip.find(query);
  } else {
    exportSlips = await ExportSlip.find();
    importSlips = await ImportSlip.find();
  }

  exportSlips.forEach((exportSlip) => {
    exportSlip.products.forEach((product) => {
      if (exportSlip.type === "Provider") {
        exportWithProvider += product.quantity;
      } else if (exportSlip.type === "Agency") {
        exportWithAgency += product.quantity;
      } else {
        exportWithCustomer += product.quantity;
      }
    });
  });
  importSlips.forEach((importSlip) => {
    importSlip.products.forEach((product) => {
      if (importSlip.type === "Agency") {
        returnWithAgency += product.quantity;
      }
    });
  });

  const countSlip = exportSlips.length;

  return res.status(httpStatus.OK).json({
    returnWithAgency,
    countSlip,
    exportWithProvider,
    exportWithAgency,
    exportWithCustomer,
  });
});

const importWithSource = catchAsync(async (req, res) => {
  const { timeStart, timeEnd } = req.query;

  let importWithProvider = 0;
  let importWithAgency = 0;
  let importWithCustomer = 0;
  let importSlips;

  if (timeStart && timeEnd) {
    const query = {};
    query.createdAt = { $gte: new Date(timeStart), $lte: new Date(timeEnd) };
    importSlips = await ImportSlip.find(query);
  } else {
    importSlips = await ImportSlip.find();
  }

  importSlips.forEach((importSlip) => {
    importSlip.products.forEach((product) => {
      if (importSlip.type === "Provider") {
        importWithProvider += product.quantity;
      } else if (importSlip.type === "Agency") {
        importWithAgency += product.quantity;
      } else {
        importWithCustomer += product.quantity;
      }
    });
  });

  const countSlip = importSlips.length;
  return res.status(httpStatus.OK).json({
    countSlip,
    importWithProvider,
    importWithAgency,
    importWithCustomer,
  });
});

const generalStatisticsController = {
  importExportRatio,
  exportWithSource,
  importWithSource,
};

export default generalStatisticsController;
