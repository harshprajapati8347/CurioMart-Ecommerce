import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword.jsx";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
