import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../../components/alert/Alert";
import { postAPI } from "../../helpers/FetchData";
import { IParams } from "../../interfaces/interfaces";

const Active = () => {
  const { slug }: IParams = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (slug) {
      postAPI("active", { active_token: slug })
        .then((res: any) => setSuccess(res.data.msg))
        .catch((err) => setErr(err.response.data.msg));
    }
  }, [slug]);
  return (
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
};

export default Active;
