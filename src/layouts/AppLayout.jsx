import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


function AppLayout() {
  return (
    <>
    <Header />

    <Outlet />
    
    <Footer />
    </>
  )
}

export default AppLayout