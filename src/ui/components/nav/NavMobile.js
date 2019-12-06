import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth/AuthContext";

import "./nav.scss";

function NavMobile() {
  const { loggedIn, logout } = useAuth();

  return (
    <div className="nav-mobile">
      <ul>
        <li className="box">
          <Link to="/map">MAP</Link>
        </li>
      </ul>
      <ul>
        {loggedIn ? (
          <button className="btn-logout-mobile" onClick={logout}>
            LOG OUT
          </button>
        ) : (
          <li className="box">
            <Link to="/account">LOG ON</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavMobile;
