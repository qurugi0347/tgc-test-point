import {apiClient} from "api";

export const getUserList = async (queryData) => {
  try {
    const result = await apiClient.get(`/users`, {params: queryData});
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};
