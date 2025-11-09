import React from "react";
import Registration from "./pages/Registration";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
