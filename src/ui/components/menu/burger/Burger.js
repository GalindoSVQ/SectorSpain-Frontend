import React from "react";
import "./burger.scss";
import { bool, func } from "prop-types";

const Burger = ({ open, setOpen }) => {
  return (
    <>
      <div className="StyledBurger" open={open} onClick={() => setOpen(!open)}>
        <div
          style={
            open ? { transform: "rotate(35deg)" } : { transform: "rotate(0)" }
          }
        />
        <div
          style={
            open
              ? { opacity: "0", transform: "translateX(-30px)" }
              : { opacity: "1", transform: "translateX(0px)" }
          }
        />
        <div
          style={
            open ? { transform: "rotate(-35deg)" } : { transform: "rotate(0)" }
          }
        />
      </div>
    </>
  );
};

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired
};

export default Burger;
