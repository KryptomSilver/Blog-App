import React from "react";
import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  return (
    <ul className="navbar-nav ms-auto">
      {bfLoginLinks.map((link, index) => (
        <li className="nav-item" key={index}>
          <NavLink className="nav-link" activeClassName="active" to={link.path}>
            {link.label}
          </NavLink>
        </li>
      ))}

      <li className="nav-item dropdown">
        <span
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Username
        </span>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>

          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/">
            Logout
          </Link>
        </div>
      </li>
    </ul>
  );
};

export default Menu;
