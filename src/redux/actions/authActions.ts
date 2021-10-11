import { Dispatch } from "react";
import { postAPI } from "../../helpers/FetchData";
import { IAlertType, IAuthType, IUserLogin } from "../../interfaces/interfaces";
import { ALERT, AUTH } from "../types";

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await postAPI("login", userLogin);
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: ALERT, payload: { success: "Login Success!" } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
