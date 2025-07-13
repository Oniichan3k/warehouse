import { authInstance, requestWithToken } from "@/utils/axios-http";


export const createdSupply = async (data) => {
  const { code, name, address, phone, email, representative, type } = data;
  try {
    const supply = await requestWithToken(authInstance,{
      url: "/supplies/createSupplies",
      method: "post",
      data: {
        code,
        name,
        address,
        phone,
        email,
        representative,
        type,
      },
    });

    return supply.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatedSupply = async (data, supplyId) => {
  const { code, name, address, phone, email, respresentative, type } = data;
  try {
    const updateSupply = await requestWithToken(authInstance, {
      url: `/supplies/updateSupplies/${supplyId}`,
      method: "put",
      data: {
        code,
        name,
        address,
        phone,
        email,
        respresentative,
        type,
      },
    });

    return updateSupply.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteSupply = async (type, supplyId) => {
  try {
    await requestWithToken(authInstance, {
      url: `/supplies/deleteSupplies/${supplyId}`,
      method: "delete",
      data: {
        type,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSupplyById = async (type, supplyId) => {
  try {
    const supply = await requestWithToken(authInstance,{
      url: `/supplies/getSupplyById/${type}/${supplyId}`,
      method: "get",
    });

    return supply.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getSupplies = async (limit, page) => {
  try {
    const supplies = await requestWithToken(authInstance,{
      url: `/supplies/getSupplies?page=${page}&limit=${limit}`,
      method: "get",
    });

    return supplies.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const searchSupply = async (code = "", name = "", phone = "", type="", page, limit) => {
  try {
    const supplies = await requestWithToken(authInstance,{
      url: `/supplies/searchSupply?code=${code}&name=${name}&phone=${phone}&type=${type}&page=${page}&limit=${limit}`,
      method: "get",
    });

    return supplies.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}