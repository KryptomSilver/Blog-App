import { GET_BLOGS, IGetBlogs, IGetBlogsType } from "../types/blogType";

const BlogReducer = (
  state: IGetBlogs[] = [],
  action: IGetBlogsType
): IGetBlogs[] => {
  switch (action.type) {
    case GET_BLOGS:
      return action.payload;
    default:
      return state;
  }
};

export default BlogReducer;
