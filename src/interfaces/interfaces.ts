import { ChangeEvent, FormEvent } from "react";
import { AUTH } from "../redux/types";

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IParams {
  page: string;
  slug: string;
}
export interface IUserLogin {
  account: string;
  password: string;
}
export interface IUser extends IUserLogin {
  _id: string;
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
}
export interface IAuth {
  token?: string;
  user?: IUser;
}
export interface IAuthType {
  type: typeof AUTH;
  payload: IAuth;
}