import BannerSlider from "@/components/BannerSlider";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
function Home({ allProducts, setAllProducts }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeUser = location.state?.userDetail;
  // console.log(user);

  const handleViewProduct = (product) => {
    navigate("/viewProduct", { state: { product } });
  };
  const addToWishlist = async (product) => {
    try {
      let url = `http://localhost:5000/users/${activeUser.user_id}/wishlists/${product.product_id}`;
      const result = await axios.post(url);

      console.log(result);
    } catch (error) {
      console.log("Error in adding to wishlist: ", error);
    }
  };
  const removeFromWishlist = (product) => {
    navigate("/viewProduct", { state: { product } });
  };
  const addToCart = async (product) => {
    try {
      let url = `http://localhost:5000/users/${activeUser.user_id}/carts/${product.product_id}`;
      const result = await axios.post(url);

      console.log(result);
    } catch (error) {
      console.log("Error in add to card: ", error);
    }
  };
  useEffect(() => {
    async function getAllProducts() {
      try {
        const result = await axios.get("http://localhost:5000/products");
        // console.log(result.data);
        setAllProducts(result.data);
      } catch (error) {
        console.log("Error in fetching products: ", error);
      }
    }

    getAllProducts();
  }, []);

  return (
    <div className="text-[30px] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white/90 pt-2">
      <BannerSlider />

      <div className="p-4 flex flex-wrap justify-center">
        {allProducts.map((product) => {
          return (
            <ProductCard
              product={product}
              key={uuidv4()}
              handleViewProduct={handleViewProduct}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          );
        })}

        {/* <ProductCard
          title="U.S. POLO ASSN."
          image={shirt}
          description="2714 Men's Super Combed Cotton Rich Solid Round Neck Regular Fit Half Sleeve T-Shirt"
          price="550"
          available="5"
        /> */}
      </div>
    </div>
  );
}

export default Home;
