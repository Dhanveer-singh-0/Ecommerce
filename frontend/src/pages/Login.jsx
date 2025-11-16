import React, { useState } from "react";
import Logo from "../assets/cart2.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

function Login({ activeUser, setActiveUser }) {
  let [user, setUser] = useState({
    email: "dhanveer@gmail.com",
    password: "password",
    type: "buyer",
  });
  let handleuser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  let handlesubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:5000/checkcredentials",
        user
      );
      const userDetail = result.data.user;
      console.log("Result: ", userDetail);
      setActiveUser(userDetail);

      if (userDetail.type == user.type) {
        userDetail.type === "buyer"
          ? navigate("/home", { state: { userDetail } })
          : navigate("/uploadproduct", { state: { userDetail } });
      } else
        swal.fire({
          title: "Role doesn't match !!!",
          icon: "error",
          confirmButtonText: "Try again.. ",
        });
    } catch (err) {
      swal
        .fire({
          title: "Incorrect mail or password !",
          icon: "error",
          confirmButtonText: "Try again.. ",
        })
        .then((res) => {
          navigate("/login");
        });
      console.log("Error in login: ", err);
    }
  };

  let navigate = useNavigate();
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
        <img src={Logo} className="w-[60px]" alt="" />
        <h1 className="text-2xl font-[monospace]"> OneCart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login To OneCart</span>
        <span className="text-[16px]">
          Welcome to OneCart, Place your order
        </span>
      </div>

      <div className="max-w-[600px] w-[90%]  bg-[#00000025] p-[10px] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify">
        <form
          action=""
          onSubmit={handlesubmit}
          className="w-[100%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          <div className="w-[90%] h-[400px] flex  flex-col items-center justify-center gap-[15px] relative">
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

            <button className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg  flex items-center justify-center mt-[20px] text-[17px] font-semibold hover:bg-[#6060d5]">
              Login
            </button>
            <p className="flex gap-[10px]">
              Don't have any account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/")}
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
