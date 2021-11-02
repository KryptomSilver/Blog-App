import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import categories from "./categoryReducer";
import blogs from "./blogReducer";
import blogsCategory from "./blogsCategoryReducer";
import otherInfo from "./otherInfoReducer";
import blogsUser from "./blogsUserReducer";

export default combineReducers({
  auth,
  alert,
  categories,
  blogs,
  blogsCategory,
  otherInfo,
  blogsUser,
});
