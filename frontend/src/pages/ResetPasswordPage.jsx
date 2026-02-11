import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword/ResetPassword.jsx";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
