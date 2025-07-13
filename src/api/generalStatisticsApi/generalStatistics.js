import { authInstance, requestWithToken } from "@/utils/axios-http";

export const importExportRatio = async (timeStart = "", timeEnd = "") => {
  const response = await requestWithToken(authInstance, {
    url: `/generalStatistics/import-export-ratio?timeStart=${timeStart}&timeEnd=${timeEnd}`,
    method: "GET",
  });

  return response.data;
};

export const exportWithSource = async (timeStart = "", timeEnd = "") => {
  const response = await requestWithToken(authInstance, {
    url: `/generalStatistics/export-with-source?timeStart=${timeStart}&timeEnd=${timeEnd}`,
    method: "GET",
  });

  return response.data;
};

export const importWithSource = async (timeStart = "", timeEnd = "") => {
  const response = await requestWithToken(authInstance, {
    url: `/generalStatistics/import-with-source?timeStart=${timeStart}&timeEnd=${timeEnd}`,
    method: "GET",
  });

  return response.data;
};
