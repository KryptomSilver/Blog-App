import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "../components/NotFound";
import { FormSubmit, RootStore, ICategory } from "../interfaces/interfaces";
import { createCategory, deleteCategory, updateCategory } from "../redux/actions/categoryActions";

const Category = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ICategory | null>(null);
  const { auth, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) return;
    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateCategory(data, auth.access_token));
    } else {
      dispatch(createCategory(name, auth.access_token));
    }
    setName("");
    setEdit(null);
  };
  const handleDelete = (id: string) => {
    if (!auth.access_token) return;
    dispatch(deleteCategory(id, auth.access_token));
  }
  if (auth.user?.role !== "admin") return <NotFound />;
  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div className="d-flex align-items-center">
          {edit && (
            <i
              className="fas fa-times me-2 text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => setEdit(null)}
            ></i>
          )}
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{edit ? "Update" : "Create"}</button>
        </div>
      </form>
      {categories.map((category) => (
        <div className="category_row" key={category._id}>
          <p className="m-0 text-capitalize">{category.name}</p>
          <div>
            <i
              className="fas fa-edit mx-2"
              onClick={() => setEdit(category)}
            ></i>
            <i className="fas fa-trash-alt" onClick={()=>handleDelete(category._id)}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
