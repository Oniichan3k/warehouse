import { authInstance, requestWithToken } from "@/utils/axios-http";

export const createdContract = async (data) => {
  const { contractContent, contractMedia } = data
  const formData = new FormData();
  formData.append('contractContent', JSON.stringify(contractContent))
  contractMedia.forEach((media) => {
    formData.append('contractMedia', media)
  });
  try {
    const res = await requestWithToken(authInstance, {
      url: '/contract/createdContract',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}