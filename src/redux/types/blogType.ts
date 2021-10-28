import { IBlog } from "../../interfaces/interfaces";
export const GET_BLOGS = "GET_BLOGS";

export interface IGetBlogs {
  _id: string;
  name: string;
  count: number;
  blogs: IBlog[];
}
export interface IGetBlogsType {
  type: typeof GET_BLOGS;
  payload: IGetBlogs[];
}
