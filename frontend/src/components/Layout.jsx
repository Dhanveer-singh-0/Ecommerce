import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // your existing navbar

const Layout = ({ activeUser }) => {
  return (
    <>
      <Navbar activeUser={activeUser} />
      {/* Give top margin so page content is not hidden behind navbar */}
      <div style={{ marginTop: "70px" }}>
        <Outlet /> {/* renders nested pages */}
      </div>
    </>
  );
};

export default Layout;
