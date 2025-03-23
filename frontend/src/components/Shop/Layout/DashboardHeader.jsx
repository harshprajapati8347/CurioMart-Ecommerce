import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server";
import logo from "../../../Assests/images/logo.png";

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-all">
        {text}
      </div>
    </div>
  );
};

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img src={logo} alt="Logo" height={80} width={80} />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Tooltip text="Coupons">
            <Link to="/dashboard-coupons" className="800px:block hidden">
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Tooltip text="Orders">
            <Link to="/dashboard-orders" className="800px:block hidden">
              <FiPackage
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Tooltip text="Messages">
            <Link to="/dashboard-messages" className="800px:block hidden">
              <BiMessageSquareDetail
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Tooltip text="Events">
            <Link to="/dashboard-events" className="800px:block hidden">
              <FiPackage
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Tooltip text="Products">
            <Link to="/dashboard-products" className="800px:block hidden">
              <FiShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${import.meta.env.VITE_APP_BACKEND_URL}/${seller.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
