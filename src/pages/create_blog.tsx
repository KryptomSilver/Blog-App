import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHoriz from "../components/cards/CardHoriz";
import CreateForm from "../components/cards/CreateForm";
import { NotFound } from "../components/global/NotFound";
import { FormSubmit, IBlog, RootStore } from "../interfaces/interfaces";
import ReactQuill from "../components/editor/ReactQuill";
import { validateBlog } from "../helpers/Valid";
import { ALERT } from "../redux/types/alertType";
import { imageUpload } from "../helpers/ImageUpload";
import { createBlog } from "../redux/actions/blogActions";

const CreateBlog = () => {
  const initialState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };
  const [blog, setBlog] = useState<IBlog>(initialState);
  const [body, setBody] = useState("");
  const [text, setText] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const { auth, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const text = div?.innerText as string;
    setText(text);
  }, [body]);
  const handleSubmit = async () => {
    if (!auth.access_token) return;
    const check = validateBlog({ ...blog, content: text });
    if (check.errLenght !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    }

    const newData = { ...blog, content: body };
    dispatch(createBlog(newData, auth.access_token));
  };
  if (!auth.access_token) return <NotFound />;
  return (
    <div className="my-4 created_blog">
      <h2>Create Blog</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Create</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>
      <ReactQuill setBody={setBody} />
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{ __html: body }}
        style={{ display: "none" }}
      />
      <small>{text.length}</small>
      <button
        className="btn btn-dark mt-3 d-block mx-auto"
        onClick={handleSubmit}
      >
        Crete Post
      </button>
    </div>
  );
};

export default CreateBlog;
