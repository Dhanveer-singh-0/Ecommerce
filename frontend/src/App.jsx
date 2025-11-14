import Registration from "./pages/Registration";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Layout from "./components/Layout.jsx";
import ViewProduct from "./pages/ViewProduct";
import React, { useState, useEffect } from "react";
import ProductUpload from "./pages/ProductUpload";

function App() {
  const [activeUser, setActiveUser] = useState(null);
  // const [allProducts, setAllProducts] = useState([]);

  return (
    <>
      <Routes>
        <Route element={<Layout activeUser={activeUser} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/viewProduct" element={<ViewProduct />} />

          <Route path="/cart" element={<Cart activeUser={activeUser} />} />
          <Route
            path="/wishlist"
            element={<Wishlist activeUser={activeUser} />}
          />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/" element={<Registration />} />
        <Route path="/uploadproduct" element={<ProductUpload />} />
        <Route
          path="/login"
          element={
            <Login activeUser={activeUser} setActiveUser={setActiveUser} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
