import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import CountDown from "./CountDown";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  if (!data) return null;

  return (
    <div
      className={`w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
        !active ? "mb-10" : ""
      } flex flex-col lg:flex-row`}
    >
      <div className="lg:w-1/2 w-full">
        <img
          src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data.images[0]}`}
          alt={data.name}
          className="w-full h-full object-cover rounded-t-xl lg:rounded-t-none lg:rounded-l-xl"
        />
      </div>

      <div className="lg:w-1/2 w-full p-6 flex flex-col justify-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
        <p className="text-gray-600">{data.description}</p>

        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center gap-2">
            <span className="line-through text-red-500 font-medium text-lg">
              {data.originalPrice}₹
            </span>
            <span className="text-green-600 font-bold text-xl">
              {data.discountPrice}₹
            </span>
          </div>
          <span className="text-sm font-medium text-blue-600">
            {data.sold_out} sold
          </span>
        </div>

        <CountDown data={data} />

        <div className="flex gap-4 mt-4">
          <Link to={`/product/${data._id}?isEvent=true`} className="flex-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all">
              See Details
            </button>
          </Link>
          <button
            onClick={() => addToCartHandler(data)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
