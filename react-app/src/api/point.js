import {apiClient} from "api";

export const getUserPointLogs = async (queryData) => {
  try {
    const result = await apiClient.get(`/point/logs`, {params: queryData});
    return result;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};

export const putUserPoint = async (userId, data) => {
  try {
    const result = await apiClient.put(`/users/${userId}/points`, data);
    return result;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
