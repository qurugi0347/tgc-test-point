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
