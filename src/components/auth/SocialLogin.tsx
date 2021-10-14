import React from "react";
import { GoogleLoginResponse, GoogleLogin } from "react-google-login-lite";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/actions/authActions";

const SocialLogin = () => {
  const dispatch = useDispatch();
  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(id_token));
  };
  const ID_CLIENTE = `${process.env.REACT_APP_MAIL_CLIENT_ID}`;
  return (
    <div className="my-2">
      <GoogleLogin
        client_id={ID_CLIENTE}
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default SocialLogin;
