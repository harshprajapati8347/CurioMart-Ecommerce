import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopResetPassword from "../components/Shop/ShopResetPassword.jsx";

const ShopResetPasswordPage = () => {
  const navigate = useNavigate();
  const { isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      <ShopResetPassword />
    </div>
  );
};

export default ShopResetPasswordPage;
