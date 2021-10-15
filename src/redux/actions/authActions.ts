import { Dispatch } from "react";
import { postAPI, getAPI } from "../../helpers/FetchData";
import { validatePhone, validRegister } from "../../helpers/Valid";
import {
  IAlertType,
  IAuthType,
  IUserLogin,
  IUserRegister,
} from "../../interfaces/interfaces";
import { ALERT, AUTH } from "../types";

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await postAPI("login", userLogin);
      dispatch({
        type: AUTH,
        payload: res.data,
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      localStorage.setItem("logged", "true");
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister);
    if (check.errLenght > 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    }
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await postAPI("register", userRegister);

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem("logged");
    if (logged !== "true") return;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await getAPI("refresh_token");
      dispatch({
        type: AUTH,
        payload: res.data,
      });

      dispatch({ type: ALERT, payload: {} });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const logout =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      localStorage.removeItem("logged");
      await getAPI("logout");
      window.location.href = "/";
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const googleLogin =
  (id_token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await postAPI("google_login", { id_token });
      dispatch({
        type: AUTH,
        payload: res.data,
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      localStorage.setItem("logged", "true");
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const loginSMS =
  (phone: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const checkPhone = validatePhone(phone);
    if (!checkPhone)
      return dispatch({
        type: ALERT,
        payload: { errors: "Phone numbre format is incorrect" },
      });
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await postAPI("sms_login", { phone });
      if (!res.data.verify) {
        verifySMS(phone, dispatch);
      }
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
const verifySMS = async (
  phone: string,
  dispatch: Dispatch<IAuthType | IAlertType>
) => {
  const code = prompt("Enter your code");
  if (!code) return;
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res: any = await postAPI("sms_verify", { phone, code });
    dispatch({
      type: AUTH,
      payload: res.data,
    });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    localStorage.setItem("logged", "true");
  } catch (error: any) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
