import { Dispatch } from "redux";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../helpers/FetchData";
import { ICategory } from "../../interfaces/interfaces";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  ICategoryType,
  UPDATE_CATEGORY,
} from "../types/categoryType";

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await postAPI("category", { name }, token);
      dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const getCategories =
  () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await getAPI("category");
      dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const updateCategory =
  (data: ICategory, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: UPDATE_CATEGORY, payload: data });
      const res: any = await patchAPI(
        `category/${data._id}`,
        { name: data.name },
        token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const deleteCategory =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: DELETE_CATEGORY, payload: id });
      const res: any = await deleteAPI(`category/${id}`, token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
