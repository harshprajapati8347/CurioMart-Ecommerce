import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { server } from "../server";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const SellerActivationPage = () => {
  const [searchParams] = useSearchParams();
  const activation_token = searchParams.get("activation_token");
  const [response, setResponse] = useState("");
  const cookies = new Cookies();

  useEffect(() => {
    if (activation_token) {
      console.log("activation_token", activation_token);
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log("res-activation-response", res);
            setResponse(res.data);
            cookies.set("token", res.data.token);
          })
          .catch((err) => {
            console.log(
              err,
              err.response,
              err.response.data,
              "error activation"
            );
          });
      };
      sendRequest();
    }
  }, [activation_token, cookies]);

  useEffect(() => {
    if (response) {
      setTimeout(() => {
        toast.success("Your account has been created suceessfully!");
        window.location.href = "/login";
      }, 3000);
    }
  }, [response]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {response ? (
        <div>
          <h1>Your account has been created successfully!</h1>
          <h1>You will be redirected to login page in 3 seconds</h1>
        </div>
      ) : (
        <h1>Processing...</h1>
      )}
    </div>
  );
};

export default SellerActivationPage;
