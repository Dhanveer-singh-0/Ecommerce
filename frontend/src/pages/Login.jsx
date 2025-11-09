import React, { useState } from "react";
import Logo from "../assets/cart2.png";

// import Logo from "../assets/cart.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

function Login() {
  let [user, setuser] = useState({
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
      console.log(user);

      const result = await axios.post(
        "http://localhost:5000/checkcredentials",
        user
      );
      console.log("Result: ", result.data);
      swal
        .fire({
          title: "Welcone to OneCart",
          icon: "success",
          confirmButtonText: "Explore OneCart",
        })
        .then((res) => {
          navigate("/home");
        });
    } catch (err) {
      console.log("Error in login: ", err);
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
