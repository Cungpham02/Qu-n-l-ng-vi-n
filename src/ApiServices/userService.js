import httpRequest from "../utils/HttpRequest";
export const Profile_Api = async (p) => {
  try {
    const response = await httpRequest.get(`/user/${p}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
