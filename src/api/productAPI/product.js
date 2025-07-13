import { authInstance, requestWithToken } from "@/utils/axios-http";

export const createdProduct = async (data) => {
  const { productCode, productName, productGroup, productMedia, productDescription, productDVT, productPrice } = data;

  const formData = new FormData();

  formData.append("productCode", productCode);
  formData.append("productName", productName);
  formData.append("productGroup", productGroup);
  formData.append("productDescription", productDescription);
  formData.append("productDVT", productDVT);
  formData.append("productPrice", productPrice);

  for (let i = 0; i < productMedia.length; i++) {
    formData.append("productMedia", productMedia[i]);
  }

  try {
    const product = await requestWithToken(authInstance, {
      url: "/product/createdProduct",
      method: "post",
      data: formData,
    });

    return product.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatedProduct = async (data, productId) => {
  const { productName, productGroup, productMedia, fileUrls, productDescription, productDVT, productPrice } = data;

  try {
    const updateProduct = await requestWithToken(authInstance, {
      url: `/product/updatedProduct/${productId}`,
      method: "put",
      data: {
        productName,
        productGroup,
        productDescription,
        productDVT,
        productPrice,
        productMedia,
        fileUrls,
      },
    });

    return updateProduct.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await requestWithToken(authInstance, {
      url: `/product/deleteProduct/${productId}`,
      method: "delete",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await requestWithToken(authInstance, {
      url: `/product/getProductById/${productId}`,
      method: "get",
    });

    return product.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (page, limit) => {
  try {
    const products = await requestWithToken(authInstance, {
      url: `/product/getProducts?page=${page}&limit=${limit}`,
      method: "get",
    });

    return products.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchProduct = async (productCode = '', productName = '', page, limit) => {
  try {
    const products = await requestWithToken(authInstance, {
      url: `/product/searchProduct?productCode=${productCode}&productName=${productName}&page=${page}&limit=${limit}`,
      method: "get",
    });

    return products.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};