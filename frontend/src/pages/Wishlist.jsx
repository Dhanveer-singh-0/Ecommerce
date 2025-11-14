import axios from "axios";
import React, { useState, useEffect } from "react";
import image from "../assets/shirt.webp";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export default function Wishlist({ activeUser }) {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    async function getAllProductsFromCart() {
      try {
        let url = `http://localhost:5000/users/${activeUser.user_id}/wishlists`;
        const result = await axios.get(url);
        console.log(url);
        setWishlist(result.data);
      } catch (error) {
        console.log("Error in fetching products: ", error);
      }
    }
    getAllProductsFromCart();
    console.log(wishlist);
  }, []);
  const addToCart = async (product) => {
    try {
      let url = `http://localhost:5000/users/${activeUser.user_id}/carts/${product.product_id}`;
      const result = await axios.post(url);

      Swal.fire({
        title: "Item added to cart !",
        icon: "success",
      });
    } catch (error) {
      console.log("Error in add to card: ", error);
    }
  };

  const removeFromWishlist = async (product) => {
    try {
      let url = `http://localhost:5000/users/${activeUser.user_id}/wishlists/${product.product_id}`;
      const result = await axios.delete(url);
      setWishlist((prev) =>
        prev.filter((item) => item.product_id !== product.product_id)
      );
      Swal.fire({
        title: "Item removed successfully !",
        icon: "success",
      });
    } catch (error) {
      console.log("Error in delete from card: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] p-6 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      <div className="w-full max-w-4xl space-y-6">
        {wishlist.map((item) => (
          <div
            key={uuidv4()}
            className="flex bg-white/10 shadow-lg rounded-xl overflow-hidden backdrop-blur-lg"
          >
            <div className="w-1/4 flex items-center justify-center bg-white/100 ">
              <img src={image} className="h-57 object-contain rounded-xl " />
            </div>

            <div className="w-3/4 p-4">
              <h2 className="text-xl font-semibold">{item.brand}</h2>
              <p className="text-sm text-gray-300">{item.description}</p>

              <p className="mt-2 text-[20px] font-bold text-green-300">
                ₹{item.base_price}
              </p>

              {/* Add to Cart Button */}
              <div className="mt-4">
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>

              {/* Remove Button */}
              <div className="mt-3">
                <button
                  onClick={() => removeFromWishlist(item)}
                  className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}

        {wishlist.length === 0 && (
          <p className="text-center text-gray-300 text-lg">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
}
