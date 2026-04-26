import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutWizard from "../components/Checkout/CheckoutWizard";
import Footer from '../components/Layout/Footer';

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <CheckoutWizard />
        <Footer />
    </div>
  )
}

export default CheckoutPage