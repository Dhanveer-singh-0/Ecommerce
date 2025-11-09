import BannerSlider from "@/components/BannerSlider";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import shirt from "../assets/shirt.webp";
import shirt2 from "../assets/shirt2.webp";
import shirt3 from "../assets/shirt3.webp";
import shirt4 from "../assets/shirt4.webp";
import axios from "axios";

function Home(user) {
  const [allProducts, setAllProducts] = useState([]);
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
    <div className="text-[30px] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white/90 ">
      <Navbar />
      <BannerSlider />

      <div className="p-4 flex flex-wrap justify-center">
        {allProducts.map((product) => {
          console.log(product);

          return (
            <ProductCard
              title={product.title}
              image={shirt}
              description={product.description}
              price={product.price}
              available={product.available}
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
      {console.log(allProducts)}
    </div>
  );
}

export default Home;
