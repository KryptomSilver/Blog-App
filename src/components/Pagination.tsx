import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

interface IProps {
  total: number;
  callback: (num: number) => void;
}
const Pagination: React.FC<IProps> = ({ total, callback }) => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const newArray = [...Array(total)].map((_, i) => i + 1);
  const isActive = (index: number) => {
    if (index === page) return "active";
    return "";
  };
  const handlePagination = (num: number) => {
    history.push(`?page=${num}`);
    callback(num);
  };
  useEffect(() => {
    const num = history.location.search.slice(6) || 1;
    setPage(Number(num));
  }, [history.location.search]);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {page > 1 && (
          <li
            className="page-item"
            onClick={() => handlePagination(page - 1)}
            style={{ cursor: "pointer" }}
          >
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        )}

        {newArray.map((num) => {
          return (
            <li
              className={`page-item ${isActive(num)}`}
              key={num}
              onClick={() => handlePagination(num)}
              style={{ cursor: "pointer" }}
            >
              <span className="page-link">{num}</span>
            </li>
          );
        })}
        {page < total && (
          <li
            className="page-item"
            onClick={() => handlePagination(page + 1)}
            style={{ cursor: "pointer" }}
          >
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
