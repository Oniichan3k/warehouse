import { authInstance, publicInstance, request, requestWithToken } from "@/utils/axios-http";

export const registerAPI = async (data) => {
  try {
    const { staffCode, fullName, email, userName, password, role } = data;
    const respone = await request(publicInstance, {
      url: "/user/register",
      method: "post",
      data: {
        staffCode,
        fullName,
        email,
        userName,
        password,
        role,
      },
    });

    return respone.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyOTP = async (data) => {
  try {
    const { userId, otp } = data;
    await request(publicInstance, {
      url: "/user/verify-otp",
      method: "post",
      data: {
        userId,
        otp,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resendOTP = async (data) => {
  try {
    const { userId, email, fullName } = data;
    await request(publicInstance, {
      url: "/user/resend-otp",
      method: "post",
      data: {
        userId,
        email,
        fullName,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const { userName, password } = data;
    const response = await request(publicInstance, {
      url: "/user/login",
      method: "post",
      data: {
        userName,
        password,
      },
    });

    const { accessToken, refreshToken, user } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await request(publicInstance, {
      url: "/user/refresh-token",
      method: "post",
      data: {
        refreshToken,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const respone = await requestWithToken(authInstance, {
      url: `/user/${userId}`,
      method: "get",
    });

    return respone.data.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePassword = async (data) => {
  try {
    const { userName, email, newPassword } = data;
    await requestWithToken(authInstance, {
      url: "/user/update-password",
      method: "put",
      data: {
        userName,
        email,
        newPassword,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const forgetPassword = async (data) => {
  try {
    const { email, userName } = data;
    await request(publicInstance, {
      url: "/user/forgot-password",
      method: "post",
      data: {
        userName,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editProfile = async (data, userId) => {
  try {
    const { fullName, email, phoneNumber, address, gender } = data;
    await requestWithToken(authInstance, {
      url: `/user/edit-profile/${userId}`,
      method: "put",
      data: {
        fullName,
        email,
        phoneNumber,
        address,
        gender,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

};

export const uploadAvatar = async (data, userId) => {
  try {
    const formData = new FormData();
    formData.append("avatar", data);

    const respone = await requestWithToken(authInstance, {
      url: `/user/upload-avatar/${userId}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    return respone.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};