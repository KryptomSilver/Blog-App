import { Dispatch } from "react";
import { postAPI } from "../../helpers/FetchData";
import {  IAuthType, IUserLogin } from "../../interfaces/interfaces";
import { AUTH } from "../types";

export const login =
  (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType>) => {
    try {
      const res: any = await postAPI("login", userLogin);
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        }
      });
      console.log(res.data)
    } catch (error: any) {
      console.log(error.response.data.msg);
    }
  };
