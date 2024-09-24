export interface IUser {
  name: string;
  email: string;
  role: "mechanical" | "admin";
  _id: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  __v: number;
}
export interface NavItem {
  title: string;
  to: string;
  icon: React.ReactNode;
}
export interface IPagination {
  numberOfPages: number;
  limit: number;
  currentPage: number;
  results: number;
}
export interface ApiError {
  param: string;
  msg: string;
}
export interface IInputProps {
  type:
    | "text"
    | "email"
    | "password"
    | "textArea"
    | "select"
    | "file"
    | "number"
    | "date";
  label: string;
  placeholder: string;
  hideOnEdit?: boolean;
  values?: {
    value: string;
    label: string;
  }[];
}
export interface ICar {
  name: string;
  model: string;
  number: string;
  color: string;
  year: string;
  creator: IUser;
  image: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
interface CarFormValue {
  createdAt: string;
  rate: number;
  review: string;
  _id: string;
}
export interface Report {
  desc: string;
  createdAt: string;
  _id: string;
  WindshieldStatus: CarFormValue[];
  airConditioning: CarFormValue[];
  brakesStatus: CarFormValue[];
  brushesStatus: CarFormValue[];
  cleanlinessStatus: CarFormValue[];
  engineStatus: CarFormValue[];
  externalStatus: CarFormValue[];
  internalStatus: CarFormValue[];
  lampsStatus: CarFormValue[];
  mechanicalStatus: CarFormValue[];
  paintStatus: CarFormValue[];
  wheelStatus: CarFormValue[];
  reviews: CarFormValue[];
  maintainer: {
    name: string;
    email: string;
  };
  meterStatus: { meterReading: string }[];
  drivers: {
    companyName: string;
    ReceptionDate: string;
    DeliveryDate: string;
    driverName: string;
  }[];
}
