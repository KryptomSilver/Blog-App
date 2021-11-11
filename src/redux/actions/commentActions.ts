import { Dispatch } from "redux";
import { getAPI, postAPI } from "../../helpers/FetchData";
import { IComment } from "../../interfaces/interfaces";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  ICreateCommentType,
  IGetCommentsType,
} from "../types/commentType";

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      const res: any = await postAPI("comment", data, token);
      dispatch({
        type: CREATE_COMMENT,
        payload: { ...res.data, user: data.user },
      });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const getComments =
  (id: string) => async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      let limit = 8;
      const res: any = await getAPI(`/comments/blog/${id}?limit=${limit}`);
      dispatch({
        type: GET_COMMENTS,
        payload: { data: res.data.comments, total: res.data.total },
      });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
