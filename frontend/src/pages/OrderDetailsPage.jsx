import React from 'react'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer'
import UserOrderDetails from "../components/UserOrderDetails";

const OrderDetailsPage = () => {
  return (
    <div>
        <Navbar />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage