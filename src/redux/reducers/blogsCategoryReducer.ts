import {
  GET_BLOGS_BY_CATEGORY,
  IBlogsCategory,
  IGetBlogsCategoryType,
} from "../types/blogType";

const BlogsCategoryReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCategoryType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_BY_CATEGORY:
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

export default BlogsCategoryReducer;
