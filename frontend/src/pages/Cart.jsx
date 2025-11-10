import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "../assets/shirt.webp";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export default function Cart({ activeUser, cartItems, setCartItems }) {
  useEffect(() => {
    async function getAllProductsFromCart() {
      try {
        let url = `http://localhost:5000/users/${activeUser.user_id}/carts`;
        const result = await axios.get(url);
        console.log(url);
        setCartItems(result.data);
      } catch (error) {
        console.log("Error in fetching products: ", error);
      }
    }
    getAllProductsFromCart();
    console.log(cartItems);
  }, []);

  const addToCart = async (product) => {
    try {
      let url = `http://localhost:5000/users/${user.user_id}/carts/${product.product_id}`;
      const result = await axios.post(url);

      console.log(result);
    } catch (error) {
      console.log("Error in add to card: ", error);
    }
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = async (product) => {
    try {
      let url = `http://localhost:5000/users/${activeUser.user_id}/carts/${product.product_id}`;
      const result = await axios.delete(url);
      setCartItems((prev) =>
        prev.filter((item) => item.product_id !== product.product_id)
      );
      Swal.fire({
        title: "Item deleted successfully !",
        icon: "success",
      });
    } catch (error) {
      console.log("Error in delete from card: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] p-6 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="w-full max-w-4xl space-y-6">
        {cartItems.map((item) => (
          <div
            key={uuidv4()}
            className="flex bg-white/10 shadow-lg rounded-xl overflow-hidden backdrop-blur-lg"
          >
            {/* Image Section */}
            <div className="w-1/4 h-60 flex items-center justify-center bg-black/20">
              <img
                src={image}
                alt="title"
                className="w-full h-55 object-contain "
              />
            </div>

            {/* Details Section */}
            <div className="w-3/4 p-4">
              <h2 className="text-xl font-semibold">{item.brand}</h2>
              <p className="text-sm text-gray-300">{item.description}</p>

              <p className="mt-2 text-[20px] font-bold text-green-300">
                ₹{item.base_price}
              </p>
              <p className="mt-2 text-white-300">
                {item.available} more available.
              </p>

              {/* <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  -
                </button>

                <span className="text-lg font-semibold">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  +
                </button>
              </div> */}

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button className="flex-1 bg-blue-500 py-2 rounded-lg hover:bg-blue-700">
                  Order Now
                </button>

                <button
                  onClick={() => removeFromCart(item)}
                  className="flex-1 bg-red-500 py-2 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length === 0 && (
          <p className="text-center text-gray-300 text-lg">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
}
