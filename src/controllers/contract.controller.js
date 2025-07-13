import httpStatus from "http-status";
import Contract from "../models/contract.model.js";
import catchAsync from "../utils/catchAsync.js";

const createdContract = catchAsync(async (req, res) => {
  const { contractContent, fileUrls } = req.body;

  const newContract = new Contract({
    contractContent,
    contractMedia: fileUrls,
  });

  await newContract.save();

  return res.status(httpStatus.CREATED).json({
    message: "Contract created successfully",
    code: httpStatus.CREATED,
    data: {
      newContract,
    },
  });
});

const contractController = {
  createdContract,
};

export default contractController;