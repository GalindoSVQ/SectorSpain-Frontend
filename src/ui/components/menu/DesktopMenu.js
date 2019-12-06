import React from "react";
import "./DesktopMenu.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";

function DesktopMenu() {
  const { loggedIn } = useAuth();

  return (
    <nav className="nav-dekstop">
      <ul>
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/crags" style={{ textDecoration: "none" }}>
            Crags
          </Link>
        </li>
        {loggedIn ? (
          <li>
            <Link to="/account" style={{ textDecoration: "none" }}>
              My account
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/account" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </li>
        )}
        <li>
          <Link to="/map" style={{ textDecoration: "none" }}>
            Browse Map
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default DesktopMenu;
