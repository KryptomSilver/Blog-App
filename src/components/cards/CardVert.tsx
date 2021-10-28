import React from "react";
import { Link } from "react-router-dom";
import { IBlog } from "../../interfaces/interfaces";

interface IProps {
  blog: IBlog;
}

const CardVert: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="card">
      {typeof blog.thumbnail === "string" && (
        <img
          src={blog.thumbnail}
          className="card-img-top"
          alt="thumbnail"
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <Link to={`/blog/${blog._id}`}>{blog.title.slice(0, 50) + "..."}</Link>

        <p className="card-text">{blog.description.slice(0, 100) + "..."}</p>
        <p className="card-text d-flex justify-content-between">
          <small className="text-muted text-capitalize">
            {typeof blog.user !== "string" && (
              <Link to={`/profile/${blog.user._id}`}>By: {blog.user.name}</Link>
            )}
          </small>
          <small className="text-muted">
            {new Date(blog.createdAt).toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
  );
};

export default CardVert;
