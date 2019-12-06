import React, { useState, useRef } from "react";
import "./head.scss";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";

import Burger from "../menu/burger";
import MobileTopMenu from "../menu/MobileTopMenu";
import DesktopMenu from "../menu/DesktopMenu";
import { useOnClickOutside } from "../menu/MobileTopMenu";

function Head() {
  const [open, setOpen] = useState(false);

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <div className="head">
      <div className="logo-title">
        <div
          className="logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <Logo />
        </div>
        <div className="title">
          <h1>
            SECTOR<span>SPAIN</span>
          </h1>
        </div>
      </div>

      <div className="desktop-menu">
        <DesktopMenu />
      </div>

      <div className="mobile-menu" ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <MobileTopMenu open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Head;
