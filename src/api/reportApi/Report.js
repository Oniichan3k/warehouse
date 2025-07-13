import { authInstance, requestWithToken } from "@/utils/axios-http";

export const reportExportImportInventory = async (
  timeStart = "",
  timeEnd = ""
) => {
  const res = await requestWithToken(authInstance, {
    url: `/report/import-export-inventory?timeStart=${timeStart}&timeEnd=${timeEnd}`,
    method: "GET",
  });
  return res.data.products;
};
