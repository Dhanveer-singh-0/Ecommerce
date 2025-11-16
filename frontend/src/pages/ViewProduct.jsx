import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { context } from "@/App";
import axios from "axios";
import Swal from "sweetalert2";

export default function ViewProduct({ activeUser }) {
  const location = useLocation();
  const product = location.state?.product;
  const addToCart = location.state?.addToCart;
  const addToWishlist = location.state?.addToWishlist;
  const [selectedSize, setSelectedSize] = React.useState(null);

  const handler = useContext(context);
  console.log(addToWishlist);

  const navigate = useNavigate();

  if (!product) return <div className="text-white p-10">No Product Found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101010] to-[#1d2b33] text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/80 hover:text-white mb-6"
      >
        <ArrowLeft size={22} /> Back
      </button>

      <div className="max-w-6xl mx-auto bg-[#141414] rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
        {/* Product Image */}
        <div className="flex justify-center items-center bg-[#1f1f1f] p-5 rounded-xl">
          <img
            src={product.img}
            alt={product.name}
            className="w-full max-h-[400px] object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-semibold mb-4">{product.brand}</h1>

            <p className="text-lg text-white/70 mb-3">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg font-semibold transition ${
                      selectedSize === size
                        ? "bg-green-600 text-white"
                        : "bg-transparent text-white/80 hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-bold text-green-400">
                ₹
                {product.base_price -
                  (product.base_price * product.discount) / 100}
              </p>
              <p className="text-xl line-through text-white/50">
                ₹{product.base_price}
              </p>
              <span className="bg-green-700 text-white px-3 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            </div>
          </div>
          <p className="text-xl text-white/60 mb-6">
            Available:{" "}
            <span
              className={
                product.available <= 20 ? " text-red-600" : " text-green-800"
              }
            >
              {product.available}
            </span>
          </p>
          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl text-lg font-semibold transition"
              onClick={async (event) => {
                event.stopPropagation();
                try {
                  let url = `http://localhost:5000/users/${activeUser.user_id}/carts/${product.product_id}`;
                  const result = await axios.post(url);
                  Swal.fire({
                    title: "Added to cart !",
                    icon: "success",
                  });
                  console.log(result);
                } catch (error) {
                  console.log("Error in add to card: ", error);
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
