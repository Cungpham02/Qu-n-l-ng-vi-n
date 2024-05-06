import * as httpRequest from "../../utils/HttpRequest";
export const login_API = async (q, p) => {
  try {
    const response = await httpRequest.post("/login/store", {
      q,
      p,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
    throw error;
  }
};
