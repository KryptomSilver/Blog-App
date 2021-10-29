import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardVert from "../components/cards/CardVert";
import Loading from "../components/Loading";
import { IBlog, RootStore } from "../interfaces/interfaces";

const Home = () => {
  const { blogs } = useSelector((state: RootStore) => state);
  if (blogs.length === 0) return <Loading />;
  return (
    <div className="home_page">
      {blogs.map((item) => (
        <div key={item._id}>
          {item.count > 0 && (
            <>
              <h3>
                <Link to={`/blogs/${item.name}`}>
                  {item.name}
                  <small>({item.count})</small>
                </Link>
              </h3>
              <hr className="mt-1" />

              <div className="home_blogs">
                {item.blogs.map((blog) => (
                  <CardVert key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          )}
          {item.count > 4 && (
            <Link
              to={`/blogs/${item.name}`}
              className="text-right d-block my-2 mb-3"
            >
              Read More &gt;&gt;
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
