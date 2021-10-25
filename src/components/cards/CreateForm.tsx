import React from "react";
import { useSelector } from "react-redux";
import { IBlog, InputChange, RootStore } from "../../interfaces/interfaces";
interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}
const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const { auth, categories } = useSelector((state: RootStore) => state);
  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };
  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };
  return (
    <form>
      <div className="form-group position-relative">
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={blog.title}
          onChange={handleChangeInput}
        />
        <small
          className="text-muted  position-absolute"
          style={{ bottom: 0, right: "3px", opacity: 0.3 }}
        >
          {blog.title.length}/50
        </small>
      </div>
      <div className="form-group my-3">
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleChangeThumbnail}
        />
      </div>
      <div className="form-group position-relative">
        <textarea
          value={blog.description}
          rows={4}
          style={{ resize: "none" }}
          className="form-control"
          name="description"
          onChange={handleChangeInput}
        />
        <small
          className="text-muted  position-absolute"
          style={{ bottom: 0, right: "3px" }}
        >
          {blog.description.length}/200
        </small>
      </div>
      <div className="form-group my-4">
        <select
          className="form-control text-capitalize"
          value={blog.category}
          onChange={handleChangeInput}
          name="category"
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateForm;
