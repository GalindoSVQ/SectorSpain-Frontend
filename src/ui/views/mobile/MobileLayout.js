import React from "react";
import Head from "../../components/head/Head";
import Footer from "../../components/footer/Footer";

function DesktopLayout({ children }) {
  return (
    <>
      <Head />
      {children}
      <Footer />
    </>
  );
}

export default DesktopLayout;
