import React from "react";
import Navbar from "../components/Navbar/Navbar"; // tu navbar normal
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer"

const PublicLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default PublicLayout;