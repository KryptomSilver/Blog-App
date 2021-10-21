import { IAuth } from "../../interfaces/interfaces";

export const AUTH = "AUTH";

export interface IAuthType {
  type: typeof AUTH;
  payload: IAuth;
}
