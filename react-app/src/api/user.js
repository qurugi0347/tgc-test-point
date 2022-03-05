import {apiClient} from "api";

export const getUserList = async (queryData) => {
  try {
    const result = await apiClient.get(`/users`, {params: queryData});
    return result;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};

export const getUserDetail = async (userId) => {
  try {
    const result = await apiClient.get(`/users/${userId}`);
    return result;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
