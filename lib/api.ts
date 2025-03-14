import api from "./axiosInstance";

//* auth api
export type RegisterUserApiData = {
  phone: string;
};
export const registerUser = async (data: RegisterUserApiData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export type VerifyUserApiData = {
  otp: string;
};
export const verifyUser = async (data: VerifyUserApiData) => {
  const response = await api.post("/auth/verify", data);
  return response.data;
};
