import httpStatus from "http-status";
import ImportSlip from "../models/importSlip.model.js";
import catchAsync from "../utils/catchAsync.js";
import ExportSlip from "../models/exportSlip.model.js";
import Product from "../models/product.model.js";

const reportExportImportInventory = catchAsync(async (req, res) => {
  const { timeStart, timeEnd } = req.query;


  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const query = {
    createdAt: {
      $gte: timeStart ? new Date(timeStart) : startOfMonth,
      $lte: timeEnd ? new Date(timeEnd) : endOfMonth,
    },
  };


  const importData = await ImportSlip.aggregate([
    { $match: query },

    { $unwind: "$products" },

    {
      $group: {
        _id: "$products.productId",
        totalImport: { $sum: "$products.quantity" },
      },
    },
  ]);


  const exportData = await ExportSlip.aggregate([
    { $match: query },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productId",
        totalExport: { $sum: "$products.quantity" },
      },
    },
  ]);

  // Ghép dữ liệu nhập/xuất thành một map
  const productMap = new Map();
  importData.forEach((item) => {
    productMap.set(item._id.toString(), {
      import: item.totalImport,
      export: 0,
    });
  });
  exportData.forEach((item) => {
    const product = productMap.get(item._id.toString()) || {
      import: 0,
      export: 0,
    };
    product.export = item.totalExport;
    productMap.set(item._id.toString(), product);
  });

  const productIds = Array.from(productMap.keys());
  const productInfo = await Product.find(
    { _id: { $in: productIds } },
    "productName productCode"
  );

  const products = productInfo.map((product) => {
    const data = productMap.get(product._id.toString());
    return {
      productId: product._id,
      productName: product.productName,
      productCode: product.productCode,
      importQuantity: data.import,
      exportQuantity: data.export,
      inventoryQuantity: data.import - data.export,
    };
  });

  products.sort((a, b) => b.importQuantity - a.importQuantity);

  return res.status(httpStatus.OK).json({
    message: "Report export import inventory successfully",
    code: httpStatus.OK,
    products,
  });
});


const reportController = {

  reportExportImportInventory,
};

export default reportController;
