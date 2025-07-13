import { authInstance, requestWithToken } from "@/utils/axios-http";

export const createdImportSlip = async (data) => {
  const { importSlipCode, providerId, userId, status, products, newProducts, contracts, type, reason, importPrice } = data;

  await requestWithToken(authInstance, {
    url: "/importSlip/createImportSlip",
    method: "post",
    data: {
      importSlipCode,
      providerId,
      userId,
      status,
      products,
      newProducts,
      contracts,
      type,
      reason,
      importPrice
    }
  });

};

export const getImportSlipById = async (importSlipId) => {
  const res = await requestWithToken(authInstance, {
    url: `/importSlip/${importSlipId}`,
    method: "get",
  });

  return res.data.data;
};

export const deletedImportSlip = async (importSlipId) => {
  await requestWithToken(authInstance, {
    url: `/importSlip/${importSlipId}`,
    method: "delete",
  });
};

export const updateStatusImportSlip = async (importSlipId, status) => {
  await requestWithToken(authInstance, {
    url: `/importSlip/${importSlipId}`,
    method: "put",
    data: {
      status,
    },
  });
};

export const getImportSlipByType = async (type, page, limit) => {
  const res = await requestWithToken(authInstance, {
    url: `/importSlip?type=${type}&page=${page}&limit=${limit}`,
    method: "get",
  });

  return res.data.data;
}

export const searchImportSlip = async (importSlipCode = "", providerId = "", agencyId = "", customerId = "", status = "", timeStart, timeEnd, page, limit, type) => {
  const res = await requestWithToken(authInstance, {
    url: `/importSlip/searchImportSlips?page=${page}&limit=${limit}&importSlipCode=${importSlipCode}&providerId=${providerId}&agencyId=${agencyId}&customerId=${customerId}&status=${status}&timeStart=${timeStart}&timeEnd=${timeEnd}&type=${type}`,
    method: "get",
  });

  return res.data.data;
};