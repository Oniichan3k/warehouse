import { authInstance, requestWithToken } from "@/utils/axios-http";

export const createdRecordInventory = async (data) => {
  const {
    recordInventoryCode,
    recordInventoryDate,
    agencyId,
    purpose,
    userId,
    products,
  } = data;
  await requestWithToken(authInstance, {
    url: "/recordInventory/createdInventory",
    method: "post",
    data: {
      recordInventoryCode,
      recordInventoryDate,
      agencyId,
      purpose,
      userId,
      products,
    },
  });
};

export const updatedStatusRecordInventory = async (data) => {
  const { recordInventoryId, status, userId } = data;

  await requestWithToken(authInstance, {
    url: `/recordInventory/updatedStatusRecordInventory/${recordInventoryId}`,
    method: "put",
    data: {
      status,
      userId,
    },
  });
};

export const deletedRecordInventory = async (recordInventoryId) => {
  await requestWithToken(authInstance, {
    url: `/recordInventory/deleteRecordInventory/${recordInventoryId}`,
    method: "delete",
  });
};

export const getRecordInventoryById = async (recordInventoryId) => {
  const res = await requestWithToken(authInstance, {
    url: `/recordInventory/getRecordInventoryById/${recordInventoryId}`,
    method: "get",
  });

  return res.data.data;
};

export const getRecordInventories = async (page = 1, limit = 10) => {
  const res = await requestWithToken(authInstance, {
    url: `/recordInventory/getRecordInventories?page=${page}&limit=${limit}`,
    method: "get",
  });

  return res.data.data;
};

export const searchRecordInventory = async (
  recordInventoryCode = "",
  status = "",
  timeStart = "",
  timeEnd = "",
  page = 1,
  limit = 10
) => {
  const res = await requestWithToken(authInstance, {
    url: `/recordInventory/searchRecordInventory?page=${page}&limit=${limit}&recordInventoryCode=${recordInventoryCode}&status=${status}&timeStart=${timeStart}&timeEnd=${timeEnd}`,
    method: "get",
  });

  return res.data.data;
};
