import { axiosInstance } from "./axios.config";

export const getAllUsersWithParams = async (params: string) => {
  const url = `/users${params}`;
  const res = await axiosInstance.get(url);
  return res.data;
};
export const createUser = async (data: object) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};
export const editUser = async (data: object, id: string) => {
  const res = await axiosInstance.put(`/users/${id}`, data);
  return res.data;
};
export const deleteUser = async (id: string) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};
