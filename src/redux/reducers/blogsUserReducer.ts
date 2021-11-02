import {
  GET_BLOGS_BY_USER_ID,
  IBlogsUser,
  IGetBlogsUserType,
} from "../types/blogType";

const BlogsUserReducer = (
  state: IBlogsUser[] = [],
  action: IGetBlogsUserType
): IBlogsUser[] => {
  switch (action.type) {
    case GET_BLOGS_BY_USER_ID:
      if (state.every((blog) => blog.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
      }
    default:
      return state;
  }
};

export default BlogsUserReducer;
