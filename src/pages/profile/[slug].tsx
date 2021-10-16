import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import OtherInfo from "../../components/profile/OtherInfo";
import UserInfo from "../../components/profile/UserInfo";
import { IParams, RootStore } from "../../interfaces/interfaces";

const Profile = () => {
  const { slug } = useParams<IParams>();
  const { auth } = useSelector((state: RootStore) => state);
  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}
      </div>
      <div className="col-md-7">
        <h3>User Blogs</h3>
      </div>
    </div>
  );
};

export default Profile;
