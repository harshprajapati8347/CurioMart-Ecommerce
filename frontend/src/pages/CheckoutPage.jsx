import React from 'react'
import Navbar from '../components/Layout/Navbar'
import CheckoutWizard from "../components/Checkout/CheckoutWizard";
import Footer from '../components/Layout/Footer';

const CheckoutPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <CheckoutWizard />
        </main>
        <Footer />
    </div>
  )
}

export default CheckoutPage