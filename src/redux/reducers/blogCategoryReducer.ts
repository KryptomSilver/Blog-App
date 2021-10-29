import {
  GET_BLOGS_BY_CATEGORY,
  IBlogsCategory,
  IGetBlogsCategoryType,
} from "../types/blogType";

const BlogCategoryReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCategoryType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_BY_CATEGORY:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default BlogCategoryReducer;
