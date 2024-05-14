import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ backgroundColor: "aliceblue" }}>
      <Header />
      <main style={{ display: "flex" }}>
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
