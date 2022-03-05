import {apiClient} from "api";

export const getUserList = async (code) => {
  try {
    const result = await apiClient.get(`/users`);
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};
