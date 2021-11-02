import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import CardVert from "../../components/cards/CardVert";
import Loading from "../../components/global/Loading";
import Pagination from "../../components/global/Pagination";
import { IBlog, IParams, RootStore } from "../../interfaces/interfaces";
import { getBlogsByCategoryId } from "../../redux/actions/blogActions";

const BlogsByCategory = () => {
  const { categories, blogsCategory } = useSelector(
    (state: RootStore) => state
  );
  const { slug } = useParams<IParams>();
  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = history.location;
  useEffect(() => {
    const category = categories.find((category) => category.name === slug);
    if (category) setCategoryId(category._id);
  }, [slug, categories]);
  useEffect(() => {
    if (!categoryId) return;
    if (blogsCategory.every((blog) => blog.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search));
    } else {
      const data = blogsCategory.find((blog) => blog.id === categoryId);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) history.push(data.search);
    }
  }, [categoryId, blogsCategory, dispatch, search, history]);
  const handlePagination = (page: number) => {
    const search = `?page=${page}`;
    dispatch(getBlogsByCategoryId(categoryId, search));
  };
  if (!blogs) return <Loading />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
      {total > 1 && <Pagination total={total} callback={handlePagination} />}
    </div>
  );
};

export default BlogsByCategory;
