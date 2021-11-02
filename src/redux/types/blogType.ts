import { IBlog } from "../../interfaces/interfaces";
export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_BY_CATEGORY = "GET_BLOGS_BY_CATEGORY";
export const GET_BLOGS_BY_USER_ID = "GET_BLOGS_BY_USER_ID";

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
export interface IBlogsCategory {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}
export interface IGetBlogsCategoryType {
  type: typeof GET_BLOGS_BY_CATEGORY;
  payload: IBlogsCategory;
}
export interface IBlogsUser {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}
export interface IGetBlogsUserType {
  type: typeof GET_BLOGS_BY_USER_ID;
  payload: IBlogsUser;
}
