import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootStore } from "../interfaces/interfaces";
import { logout } from "../redux/actions/authActions";

const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  const afLoginLinks = [
    { label: "Home", path: "/" },
    { label: "CreateBlog", path: "/create_blog" },
  ];
  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;
  return (
    <ul className="navbar-nav ms-auto">
      {navLinks.map((link, index) => (
        <li className="nav-item" key={index}>
          <NavLink className="nav-link" activeClassName="active" to={link.path}>
            {link.label}
          </NavLink>
        </li>
      ))}
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
            <Link className="dropdown-item" to="/profile">
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
