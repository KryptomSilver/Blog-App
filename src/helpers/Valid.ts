import { IBlog, IUserRegister } from "../interfaces/interfaces";

export const validRegister = ({
  name,
  account,
  password,
  cf_password,
}: IUserRegister) => {
  const errors: string[] = [];
  if (!name) {
    errors.push("Please add your name.");
  } else if (name.length > 20) {
    errors.push("Your name is up to 20 chars long.");
  }
  if (!account) {
    errors.push("Please add your account or phone number");
  } else if (!validateEmail(account) && !validatePhone(account)) {
    errors.push("Email or phone number format is incorrect.");
  }
  const msg = checkPassword(password, cf_password);
  if (msg) errors.push(msg);
  return {
    errMsg: errors,
    errLenght: errors.length,
  };
};
export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars";
  } else if (password !== cf_password) {
    return "Confirm password did not match.";
  }
};
export const validatePhone = (phone: string) => {
  const re = /^[+]/g;
  return re.test(phone);
};
export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const validateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const errors: string[] = [];
  if (title.trim().length < 10) {
    errors.push("Title has at lest 10 characters.");
  } else if (title.trim().length > 50) {
    errors.push("Title is up to 50 characters long.");
  }
  if (content.trim().length < 2000) {
    errors.push("Content has at lest 2000 characters.");
  }
  if (description.trim().length < 50) {
    errors.push("Description has at lest 50 characters.");
  } else if (description.trim().length > 200) {
    errors.push("Description is up to 200 characters long.");
  }
  if (!thumbnail) {
    errors.push("Thumbanail cannot be left blank.");
  }
  if (!category) {
    errors.push("Category cannot be left blank.");
  }
  return {
    errMsg: errors,
    errLenght: errors.length,
  };
};
