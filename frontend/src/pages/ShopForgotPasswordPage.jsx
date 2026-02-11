import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopForgotPassword from "../components/Shop/ShopForgotPassword.jsx";

const ShopForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      <ShopForgotPassword />
    </div>
  );
};

export default ShopForgotPasswordPage;
