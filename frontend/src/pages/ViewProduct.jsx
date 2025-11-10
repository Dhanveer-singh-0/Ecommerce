import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewProduct() {
  const location = useLocation();
  const product = location.state?.product;
  console.log(product);

  return <div>ViewProduct</div>;
}
