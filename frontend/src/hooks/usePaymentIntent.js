import { useState } from "react";
import axios from "axios";

export const usePaymentIntent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClientSecret = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/create-order`,
        orderData,
        config,
      );
      setLoading(false);
      if (data.success) {
        return { clientSecret: data.client_secret, orders: data.orders };
      }
      throw new Error("Failed to create order");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong while creating order.",
      );
      return null;
    }
  };

  return { fetchClientSecret, loading, error };
};
