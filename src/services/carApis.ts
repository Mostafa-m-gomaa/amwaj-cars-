import { axiosInstance } from "./axios.config";

export const getAllCarsWithParams = async (params: string) => {
  const url = `/cars${params}`;
  const res = await axiosInstance.get(url);
  return res.data;
};
export const createCar = async (data: FormData) => {
  const res = await axiosInstance.post("/cars", data);
  return res.data;
};
export const editCar = async (data: FormData, id: string) => {
  const res = await axiosInstance.put(`/cars/${id}`, data);
  return res.data;
};
export const deleteCar = async (id: string) => {
  const res = await axiosInstance.delete(`/cars/${id}`);
  return res.data;
};
export const addReport = async (car : string , desc : string) => {
  const res = await axiosInstance.post(`/reports` , {car  , desc} , {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export interface IRate {
  rate: number;
  review: string;
}
export interface MRate {
  meterReading: string;
}
export interface DRate {
  companyName: string;
  driverName: string;
  ReceptionDate: string;
  DeliveryDate: string;
}
export const addFeature = async (car : string , field : string , rateObject : IRate ) => {
  const res = await axiosInstance.put(`/reports/${car}/rate` , {field  , rateObject} , {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const addMeter = async (car : string , field : string , rateObject : MRate ) => {
  const res = await axiosInstance.put(`/reports/${car}/rate` , {field  , rateObject} , {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const addDriver = async (car : string , field : string , rateObject : DRate ) => {
  const res = await axiosInstance.put(`/reports/${car}/rate` , {field  , rateObject} , {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const getReports = async (id :string) => {
  const res = await axiosInstance.get(`/reports?car=${id}`);
 
  return res.data;
};
