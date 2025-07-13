import { authInstance, requestWithToken } from "@/utils/axios-http";

export const createdExportSlip = async (data) => {
  const {
    exportSlipCode,
    providerId,
    userId,
    status,
    products,
    newProducts,
    contracts,
    type,
    reason,
    exportPrice,
  } = data;

  await requestWithToken(authInstance, {
    url: "/exportSlip/createExportSlip",
    method: "post",
    data: {
      exportSlipCode,
      providerId,
      userId,
      status,
      products,
      newProducts,
      contracts,
      type,
      reason,
      exportPrice,
    },
  });
};

export const getExportSlipById = async (exportSlipId) => {
  const res = await requestWithToken(authInstance, {
    url: `/exportSlip/${exportSlipId}`,
    method: "get",
  });

  return res.data.data;
};

export const deletedExportSlip = async (exportSlipId) => {
  await requestWithToken(authInstance, {
    url: `/exportSlip/${exportSlipId}`,
    method: "delete",
  });
};

export const updateStatusExportSlip = async (exportSlipId, status) => {
  await requestWithToken(authInstance, {
    url: `/exportSlip/${exportSlipId}`,
    method: "put",
    data: {
      status,
    },
  });
};

export const getExportSlipByType = async (type, page, limit) => {
  const res = await requestWithToken(authInstance, {
    url: `/exportSlip?type=${type}&page=${page}&limit=${limit}`,
    method: "get",
  });

  return res.data.data;
};

export const searchExportSlip = async (
  exportSlipCode = "",
  providerId = "",
  agencyId = "",
  customerId = "",
  status = "",
  timeStart,
  timeEnd,
  page,
  limit,
  type
) => {
  const res = await requestWithToken(authInstance, {
    url: `/exportSlip/searchExportSlips?page=${page}&limit=${limit}&exportSlipCode=${exportSlipCode}&providerId=${providerId}&agencyId=${agencyId}&customerId=${customerId}&status=${status}&timeStart=${timeStart}&timeEnd=${timeEnd}&type=${type}`,
    method: "get",
  });

  return res.data.data;
};
