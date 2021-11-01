import { Dispatch } from "redux";
import { getAPI, postAPI } from "../../helpers/FetchData";
import { imageUpload } from "../../helpers/ImageUpload";
import { IBlog } from "../../interfaces/interfaces";
import { ALERT, IAlertType } from "../types/alertType";
import {
  GET_BLOGS,
  GET_BLOGS_BY_CATEGORY,
  IGetBlogsCategoryType,
  IGetBlogsType,
} from "../types/blogType";

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }
      const newBlog = { ...blog, thumbnail: url };
      const res: any = await postAPI("blog", newBlog, token);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const getBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await getAPI("blog");
      dispatch({ type: GET_BLOGS, payload: res.data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
      const limit = 4;
      const value = search ? search : `?page=${1}`;
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await getAPI(`blog/${id}${value}&limit=${limit}`);
      dispatch({
        type: GET_BLOGS_BY_CATEGORY,
        payload: { ...res.data, id, search },
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
