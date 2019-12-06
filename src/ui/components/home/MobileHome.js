import React from "react";
import LogoMobileAnimated from "../../components/logo/LogoMobileAnimated";
import NavMobile from "../nav/NavMobile";
import Provinces from "../autocomplete/Provinces";

function MobileHome() {
  return (
    <>
      <LogoMobileAnimated />
      <Provinces />
      <NavMobile />
    </>
  );
}

export default MobileHome;
