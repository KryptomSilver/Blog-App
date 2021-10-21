import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootStore } from "../interfaces/interfaces";
import { logout } from "../redux/actions/authActions";

const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  const afLoginLinks = [
    { label: "Home", path: "/" },
    { label: "CreateBlog", path: "/create_blog" },
  ];
  const isActive = (pn: string) => {
    if (pn === pathname) return "active";
  };
  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;
  return (
    <ul className="navbar-nav ms-auto">
      {navLinks.map((link, index) => (
        <li className={`nav-item ${isActive(link.path)}`} key={index}>
          <Link className="nav-link" to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}
      {auth.user?.role === "admin" && (
        <li className={`nav-item ${isActive("/category")}`}>
          <Link className="nav-link" to="/category">
            Category
          </Link>
        </li>
      )}
      {auth.user && (
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src={auth.user.avatar} alt="avatar" className="avatar" />
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Profile
            </Link>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      )}
    </ul>
  );
};

export default Menu;
