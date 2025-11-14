import React, { useState } from "react";
import { Heart } from "lucide-react";
import image from "../assets/shirt.webp";
import Swal from "sweetalert2";

export default function ProductCard({
  product,
  handleViewProduct,
  addToWishlist,
  removeFromWishlist,
  addToCart,
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-70 h-125 m-5 cursor-pointer"
      onClick={() => handleViewProduct(product)}
    >
      <img
        src={product.img}
        alt={"title"}
        className="w-full h-70 object-contain"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-black">{product.brand}</h2>
        <p className="text-sm text-gray-800">{product.description}</p>

        <p className="text-[20px] text-gray-800 mt-1">
          ₹{product.base_price} /-
        </p>
        <p
          className={
            product.available <= 20
              ? "text-sm text-red-600"
              : "text-sm text-green-800"
          }
        >
          Only {product.available} available.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setLiked(!liked);
              addToWishlist(product);
            }}
            className="p-2 rounded-full border hover:bg-red-100 transition-colors"
          >
            <Heart
              className={`w-6 h-6 ${
                liked ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>

          <button
            className="flex-1 bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition-colors"
            onClick={(event) => {
              event.stopPropagation();

              addToCart(product);
              Swal.fire({
                title: "Added to cart !",
                icon: "success",
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
