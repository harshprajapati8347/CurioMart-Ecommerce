import React from 'react'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer'
import TrackOrder from "../components/Profile/TrackOrder";

const TrackOrderPage = () => {
  return (
    <div>
        <Navbar />
        <TrackOrder />
        <Footer />
    </div>
  )
}

export default TrackOrderPage