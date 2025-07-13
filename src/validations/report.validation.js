import joi from "joi";

const reportExportImportInventory = {
  query: joi.object({
    timeStart: joi.date().optional().allow(""),
    timeEnd: joi.date().optional().allow(""),
  }),
};

const reportValidation = {
  reportExportImportInventory,
};

export default reportValidation;