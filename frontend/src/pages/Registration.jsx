import React, { useState } from "react";
import Logo from "../assets/cart2.png";

import axios from "axios";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { IoEyeOff } from "react-icons/io5";
import swal from "sweetalert2";
function Registration() {
  let [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
    type: "buyer",
  });
  let handleuser = (event) => {
    setuser({ ...user, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };
  let handlesubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:5000/register", user);
      console.log("Result: ", result.data);
      swal
        .fire({
          title: "Welcone to OneCart",
          text: "You account has been created.",
          icon: "success",
          confirmButtonText: "Login now",
        })
        .then((res) => {
          if (res.isConfirmed == true) navigate("/login");
        });
    } catch (err) {
      console.log("Error in sending user data: ", err);
    }
  };
  let navigate = useNavigate();
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} className="w-[60px]" alt="" />
        <h1 className="text-2xl font-[monospace]"> OneCart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">
          Registration To Use OneCart
        </span>
        <span className="text-[16px]">
          Welcome to OneCart, Place your order
        </span>
      </div>

      <div className="max-w-[600px] w-[90%]  bg-[#00000025] p-[10px] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify">
        <form
          action=""
          className="w-[100%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
          onSubmit={handlesubmit}
        >
          {/* <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[5px] cursor-pointer">
            <img src={google} alt="" className="w-[20px]" />
            Register with Google
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>Or
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div> */}
          <div className="w-[90%] h-[400px] flex  flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Username.."
              required
              name="username"
              value={user.username}
              onChange={handleuser}
            />
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="E-mail.."
              required
              name="email"
              value={user.email}
              onChange={handleuser}
            />
            <input
              // type={show ? "text" : "password"}
              type="password"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password.."
              required
              name="password"
              value={user.password}
              onChange={handleuser}
            />
            {/* {!show && (
              <LuEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]"
                onClick={() => {
                  setshow(prev);
                }}
              />
            )}
            {show && (
              <IoEyeOff
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]"
                onClick={() => {
                  setshow(prev);
                }}
              />
            )} */}
            <select
              className="w-[100%] h-[50px] bg-[#00000025] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              name="type"
              value={user.type}
              onChange={handleuser}
            >
              <option
                value="buyer"
                className="text-[white] bg-[#0B1B1E] border-[2px] border-[#96969635] rounded-lg "
              >
                Buyer
              </option>
              <option value="seller" className="text-[white] bg-[#0B1B1E]">
                Seller
              </option>
            </select>
            <button
              type="submit"
              className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg  flex items-center justify-center mt-[20px] text-[17px] font-semibold hover:bg-[#6060d5]"
            >
              Create Account
            </button>
            <p className="flex gap-[10px]">
              Already have any account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
