import { IAuth, IAuthType } from "../../interfaces/interfaces";
import { AUTH } from "../types";

const authReducer = (state: IAuth = {}, action: IAuthType): IAuth => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};
export  default  authReducer