import BannerSlider from "@/components/BannerSlider";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "@/App";
import Swal from "sweetalert2";
function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [p_ids, setp_ids] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const wish = useContext(context);

  const activeUser = location.state?.userDetail;
  const filter = location.state?.filter;
  const handleViewProduct = (product) => {
    console.log({ product, addToCart, addToWishlist });

    navigate("/viewProduct", { state: { product } });
  };

  const addToWishlist = async (product) => {
    try {
      let url = `http://localhost:5000/users/${activeUser.user_id}/wishlists/${product.product_id}`;
      const result = await axios.post(url);
      setp_ids([...p_ids, product.product_id]);
    } catch (error) {
      console.log("Error in adding to wishlist: ", error);
    }
  };
  const removeFromWishlist = async (product) => {
    try {
      let url = `http://localhost:5000/users/${activeUser.user_id}/wishlists/${product.product_id}`;
      const result = await axios.delete(url);
      setp_ids(p_ids.filter((id) => id !== product.product_id));
    } catch (error) {
      console.log("Error in adding to wishlist: ", error);
    }
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
    const getAllProducts = async () => {
      try {
        const result = await axios.get("http://localhost:5000/products");
        setAllProducts(result.data);
      } catch (error) {
        console.log("Error in fetching products: ", error);
      }
    };
    async function loadWishlist() {
      try {
        let url = `http://localhost:5000/users/${activeUser.user_id}/wishlists`;
        const result = await axios.get(url);
        wish.setWishlist(result.data);
        setp_ids(result.data.map((p) => p.product_id));
      } catch (error) {
        console.log("Error in fetching products: ", error);
      }
    }

    getAllProducts();
    loadWishlist();
    console.log(wish.wishlist);
    console.log(p_ids);
  }, []);

  return (
    <div className="text-[30px] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white/90 pt-2">
      <BannerSlider />
      <div className="p-4 flex flex-wrap justify-center">
        {console.log(allProducts)}
        {allProducts
          .filter((product) => {
            if (!filter) return true;
            if (filter === "all") return true;
            return product.target.toLowerCase() === filter;
          })
          .map((product) => {
            return (
              <ProductCard
                product={product}
                key={uuidv4()}
                handleViewProduct={handleViewProduct}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
                isWish={p_ids.indexOf(product.product_id) >= 0 ? true : false}
              />
            );
          })}
      </div>
      {console.log(allProducts)}
    </div>
  );
}

export default Home;
