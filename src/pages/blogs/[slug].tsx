import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CardVert from "../../components/cards/CardVert";
import { NotFound } from "../../components/NotFound";
import { IBlog, IParams, RootStore } from "../../interfaces/interfaces";
import { getBlogsById } from "../../redux/actions/blogActions";

const BlogsByCategory = () => {
  const { categories, blogsCategory } = useSelector(
    (state: RootStore) => state
  );
  const { slug } = useParams<IParams>();
  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const category = categories.find((category) => category.name === slug);
    if (category) setCategoryId(category._id);
  }, [slug, categories]);
  useEffect(() => {
    if (!categoryId) return;
    if (blogsCategory.every((blog) => blog.id !== categoryId)) {
      dispatch(getBlogsById(categoryId));
    } else {
      const data = blogsCategory.find((blog) => blog.id === categoryId);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [categoryId, blogsCategory]);
  if (!blogs) return <NotFound />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsByCategory;
