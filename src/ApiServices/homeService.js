import httpRequest from "../utils/HttpRequest";

export const getRoleApi = async () => {
  try {
    const response = await httpRequest.get("/home");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
