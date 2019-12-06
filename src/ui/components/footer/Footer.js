import React from "react";
import "./footer.scss";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Facebook } from "../../../assets/icons/facebook.svg";
import { ReactComponent as Instagram } from "../../../assets/icons/instagram.svg";

function Footer() {
  return (
    <footer className="footer-desktop">
      <div className="footer-container">
        <div className="rrss">
          ROCK CLIMBING DESTINATIONS IN SPAIN
          <ul>
            <li>
              <a href="/">
                <Instagram width="20px" height="20px" />
              </a>
            </li>
            <li>
              <a href="/">
                <Facebook width="20px" height="20px" />
              </a>
            </li>
            <li>
              <a href="/">
                <Twitter width="20px" height="20px" />
              </a>
            </li>
          </ul>
        </div>
        <div className="resume">
          <span className="title">SECTOR SPAIN</span>
          <span className="notice">
            Climbing is dangerous and there are restrictions. Use this site at
            your own risk
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
