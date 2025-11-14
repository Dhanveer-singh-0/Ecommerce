import React, { useState } from "react";
import Logo from "../assets/cart2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

function ProductUpload() {
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    user_id: 4,
    brand: "Puma",
    target: "",
    category: "Shoe",
    available: 100,
    base_price: 1200,
    discount: 10,
    description: "A nice shoe to wear",
  });

  const [image, setImage] = useState(null);

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(image);

    const formData = new FormData();
    for (const key in product) formData.append(key, product[key]);
    formData.append("image", image);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": ", pair[1]);
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/addproducts",
        formData
      );
      swal.fire({
        title: "Product Added!",
        text: "Your product has been successfully uploaded.",
        icon: "success",
      });
      console.log(result.data);
    } catch (err) {
      console.log("Error uploading product:", err);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      {/* Navbar */}
      <div
        className="w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} className="w-[60px]" alt="" />
        <h1 className="text-2xl font-[monospace]">OneCart</h1>
      </div>

      {/* Page Title */}
      <div className="w-full text-center mt-4">
        <h1 className="text-[25px] font-semibold">Add New Product</h1>
        <p className="text-[16px] opacity-80">Upload your product details</p>
      </div>

      {/* Form Container */}
      <div className="max-w-[600px] w-[90%] bg-[#00000025] p-[20px] border border-[#9993] rounded-lg shadow-lg backdrop-blur-xl mt-6">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-[15px]"
        >
          {/* Brand */}
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={product.brand}
            required
            onChange={handleInput}
            className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px] font-semibold"
          />
          {/* Target */}
          <select
            name="target"
            onChange={handleInput}
            required
            className="w-full h-[50px] border border-[#96969635] rounded-lg bg-[#00000025] px-[20px] font-semibold"
          >
            <option value="">Target (Male/Female/Kids)</option>
            <option value="men" className="bg-[#0B1B1E]">
              Men
            </option>
            <option value="women" className="bg-[#0B1B1E]">
              Women
            </option>
            <option value="kids" className="bg-[#0B1B1E]">
              Kids
            </option>
          </select>
          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            value={product.category}
            onChange={handleInput}
            className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px] font-semibold"
          />
          {/* Available */}
          <input
            type="number"
            name="available"
            placeholder="Available Quantity"
            required
            value={product.available}
            onChange={handleInput}
            className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px] font-semibold"
          />
          {/* Base Price */}
          <input
            type="number"
            name="base_price"
            placeholder="Base Price"
            required
            value={product.base_price}
            onChange={handleInput}
            className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px] font-semibold"
          />
          {/* Discount */}
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            required
            value={product.discount}
            onChange={handleInput}
            className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px] font-semibold"
          />
          {/* Description */}
          <textarea
            name="description"
            rows="4"
            placeholder="Product Description"
            required
            value={product.description}
            onChange={handleInput}
            className="w-full border border-[#96969635] rounded-lg bg-transparent px-[20px] py-[10px] font-semibold"
          ></textarea>
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImage}
            className="pt-2 w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px] font-semibold"
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[50px] mt-[10px] bg-[#6060f5] rounded-lg font-semibold hover:bg-[#5050d5]"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductUpload;
