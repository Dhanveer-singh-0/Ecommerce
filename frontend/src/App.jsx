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

function App() {
  const [activeUser, setActiveUser] = useState(null);

  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <>
      <Routes>
        <Route element={<Layout activeUser={activeUser} />}>
          <Route
            path="/home"
            element={
              <Home allProducts={allProducts} setAllProducts={setAllProducts} />
            }
          />
          <Route path="/viewProduct" element={<ViewProduct />} />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                activeUser={activeUser}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                activeUser={activeUser}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/" element={<Registration />} />
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
