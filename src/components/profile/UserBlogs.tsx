import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { IBlog, IParams, RootStore } from "../../interfaces/interfaces";
import { getBlogsByUserId } from "../../redux/actions/blogActions";
import Loading from "../alert/Loading";
import CardHoriz from "../cards/CardHoriz";
import Pagination from "../global/Pagination";

const UserBlogs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = history.location;
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);
  const { blogsUser } = useSelector((state: RootStore) => state);
  const user_id = useParams<IParams>().slug;
  useEffect(() => {
    if (!user_id) return;
    if (blogsUser.every((item) => item.id !== user_id)) {
      dispatch(getBlogsByUserId(user_id, search));
    } else {
      const data = blogsUser.find((item) => item.id === user_id);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) history.push(data.search);
    }
  }, [user_id, dispatch, blogsUser, history, search]);
  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByUserId(user_id, search));
  };
  if (!blogs) return <Loading />;
  if (blogs.length === 0) return <h3 className="text-center">No blogs</h3>;
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <CardHoriz blog={blog} key={blog._id} />
        ))}
      </div>
      <div>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </div>
  );
};

export default UserBlogs;
