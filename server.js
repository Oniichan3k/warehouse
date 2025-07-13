import "dotenv/config";
import "module-alias/register";
import express from "express";
import cors from "cors";
const app = express();

import { connectDB } from "@/utils/db.js";
const PORT = process.env.PORT;
import userRouter from "@/routes/user.route.js";
import productRouter from "@/routes/product.route.js";
import suppliesRouter from "@/routes/supplies.route.js";
import importSlipRouter from "@/routes/importSlip.route.js";
import contractRouter from "@/routes/contract.route.js";
import exportSlipRouter from "@/routes/exportSlip.route.js";
import generalStatisticsRouter from "@/routes/generalStatistics.route.js";
import reportRouter from "@/routes/report.route.js";
import recordInventoryRouter from "@/routes/recordInventory.route.js";

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/supplies", suppliesRouter);
app.use("/api/importSlip", importSlipRouter);
app.use("/api/contract", contractRouter);
app.use("/api/exportSlip", exportSlipRouter);
app.use("/api/generalStatistics", generalStatisticsRouter);
app.use("/api/report", reportRouter);
app.use("/api/recordInventory", recordInventoryRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
