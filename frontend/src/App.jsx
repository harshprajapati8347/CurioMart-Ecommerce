import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
  ForgotPasswordPage,
  ShopForgotPasswordPage,
  ResetPasswordPage,
  ShopResetPasswordPage,
  CartPage,
  WishlistPage,
} from "./routes/Routes.jsx";

import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
  ShopEditProduct,
} from "./routes/ShopRoutes.jsx";

import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./routes/AdminRoutes.jsx";

import { ShopHomePage } from "./ShopRoutes.jsx";

import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute.jsx";

import CookieBanner from "./components/CookieConsent/CookieBanner";
import { initializeDefaultConsent } from "./utils/cookieConsent";

const App = () => {
  useEffect(() => {
    initializeDefaultConsent();

    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/sign-up", element: <SignupPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    { path: "/reset-password", element: <ResetPasswordPage /> },
    { path: "/activation", element: <ActivationPage /> },
    { path: "/seller/activation", element: <SellerActivationPage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/product/:id", element: <ProductDetailsPage /> },
    { path: "/best-selling", element: <BestSellingPage /> },
    { path: "/events", element: <EventsPage /> },
    { path: "/faq", element: <FAQPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/wishlist", element: <WishlistPage /> },
    { path: "/order/success", element: <OrderSuccessPage /> },
    { path: "/shop-create", element: <ShopCreatePage /> },
    { path: "/shop-login", element: <ShopLoginPage /> },
    { path: "/shop-forgot-password", element: <ShopForgotPasswordPage /> },
    { path: "/shop-reset-password", element: <ShopResetPasswordPage /> },
    { path: "/shop/preview/:id", element: <ShopPreviewPage /> },
  ];

  const userRoutes = [
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inbox",
      element: (
        <ProtectedRoute>
          <UserInbox />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/order/:id",
      element: (
        <ProtectedRoute>
          <OrderDetailsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/track/order/:id",
      element: (
        <ProtectedRoute>
          <TrackOrderPage />
        </ProtectedRoute>
      ),
    },
  ];

  const sellerRoutes = [
    {
      path: "/shop/:id",
      element: (
        <SellerProtectedRoute>
          <ShopHomePage />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <SellerProtectedRoute>
          <ShopSettingsPage />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <SellerProtectedRoute>
          <ShopDashboardPage />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-create-product",
      element: (
        <SellerProtectedRoute>
          <ShopCreateProduct />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-edit-product/:id",
      element: (
        <SellerProtectedRoute>
          <ShopEditProduct />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-orders",
      element: (
        <SellerProtectedRoute>
          <ShopAllOrders />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-refunds",
      element: (
        <SellerProtectedRoute>
          <ShopAllRefunds />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/order/:id",
      element: (
        <SellerProtectedRoute>
          <ShopOrderDetails />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-products",
      element: (
        <SellerProtectedRoute>
          <ShopAllProducts />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-create-event",
      element: (
        <SellerProtectedRoute>
          <ShopCreateEvents />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-events",
      element: (
        <SellerProtectedRoute>
          <ShopAllEvents />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-coupons",
      element: (
        <SellerProtectedRoute>
          <ShopAllCoupouns />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-withdraw-money",
      element: (
        <SellerProtectedRoute>
          <ShopWithDrawMoneyPage />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-messages",
      element: (
        <SellerProtectedRoute>
          <ShopInboxPage />
        </SellerProtectedRoute>
      ),
    },
  ];

  const adminRoutes = [
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardPage />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin-users",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardUsers />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin-sellers",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardSellers />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin-orders",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardOrders />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin-products",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardProducts />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin-events",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardEvents />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin-withdraw-request",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardWithdraw />
        </ProtectedAdminRoute>
      ),
    },
  ];

  const routes = [
    ...publicRoutes,
    ...userRoutes,
    ...sellerRoutes,
    ...adminRoutes,
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <CookieBanner />
    </BrowserRouter>
  );
};

export default App;
