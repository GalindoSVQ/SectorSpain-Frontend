import React from "react";
import { motion } from "framer-motion";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import "./LogoAnimated.scss";
const LogoMobileAnimated = () => {
  return (
    <div className="logo-animated">
      <motion.div
        animate={{
          scale: [0.7, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: [1, 0.3]
        }}
        style={{
          width: "60%",
          height: "60%",
          // marginTop: "1rem",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Logo />
      </motion.div>
    </div>
  );
};

export default LogoMobileAnimated;
