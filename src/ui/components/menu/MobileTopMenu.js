import React, { useEffect } from "react";
import "./MobileTopMenu.scss";
import { bool } from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const MobileTopMenu = ({ open }) => {
  const { loggedIn } = useAuth();

  return (
    <div
      className="StyledMenu"
      style={
        open
          ? { transform: "translateX(0)" }
          : { transform: "translateX(100%)" }
      }
    >
      <Link to="/">
        <span role="img" aria-label="House Building">
          &#x1F3E0;
        </span>
        Home
      </Link>
      <Link to="/crags">
        <span role="img" aria-label="Mountain">
          &#x1F3D4;
        </span>
        Crags
      </Link>
      <Link to="/account">
        <span role="img" aria-label="Person Climbing">
          &#x1f9d7;
        </span>
        {loggedIn ? "Acount" : "Log in"}
      </Link>
      <Link to="/map">
        <span role="img" aria-label="Earth Globe">
          &#x1F30E;
        </span>
        MAP
      </Link>
    </div>
  );
};

MobileTopMenu.propTypes = {
  open: bool.isRequired
};

export default MobileTopMenu;
