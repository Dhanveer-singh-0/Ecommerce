import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "../assets/cart2.png";

export default function Navbar({ activeUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" bg-gradient-to-l from-[#141414] to-[#0c2025] text-white/90 text-white shadow-md font-roboto p-4 navbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-10 md:w-12" alt="logo" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            <Link to="/home" state={{ userDetail: activeUser }}>
              OneCart
            </Link>
          </h1>
        </div>

        <div className="flex-1 mx-4">
          <Input
            placeholder="Search products..."
            className="w-full bg-white text-black placeholder-gray-500"
          />
        </div>

        <div className="hidden md:flex items-center gap-4 text-lg">
          <Link
            to="home"
            state={{ filter: "men" }}
            className="hover:text-gray-200"
          >
            Men
          </Link>
          <Link
            to="/home"
            state={{ filter: "women" }}
            className="hover:text-gray-200"
          >
            Women
          </Link>
          <Link
            to="/home"
            state={{ filter: "kids" }}
            className="hover:text-gray-200"
          >
            Kids
          </Link>
          <Link to="/wishlist">
            <Heart className="text-red-500 fill-red-400 w-6 h-6" />
          </Link>
          <Link to="/cart">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 border-t border-blue-500 pt-2 flex flex-col gap-2">
          <Link
            to="/home"
            state={{ filter: "men" }}
            className="hover:text-gray-200"
          >
            Men
          </Link>
          <Link
            to="/home"
            state={{ filter: "women" }}
            className="hover:text-gray-200"
          >
            Women
          </Link>
          <Link
            to="/home"
            state={{ filter: "kids" }}
            className="hover:text-gray-200"
          >
            Kid
          </Link>
          <div className="flex items-center gap-4 mt-1">
            <Link to="/wishlist">
              <Heart className="text-red-500 fill-red-400 w-6 h-6" />
            </Link>
            <Link to="/cart">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
