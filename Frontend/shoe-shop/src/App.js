import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Index from "./components/Index";
import ProductDetail from "./components/ProductDetails";
import UpdateProductDetail from "./components/UpdateProductDetails";
import {
  default as Profile,
  default as Transaction,
} from "./components/Profile";
import SetPassword from "./components/SetPasswrod";
import Upload from "./components/Upload";
import Auth from "./components/auth";
import Tables from "./components/Transaction";
import Product from "./components/Product";

const App = () => {
  if (
    localStorage.getItem("token") === "null" ||
    localStorage.getItem("token") === ""
  ) {
    <Navigate to="/" />;
  } else {
    <Navigate to="/home" />;
  }

  return (
    <Router>
      <Routes>
        {/* authenticate */}
        <Route path="/auth/login" element={<Auth.Login />} />
        <Route path="/auth/signup" element={<Auth.Signup />} />
        <Route path="/auth/set-password" element={<SetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/upload" element={<Upload />} />
        <Route path="/admin/transaction" element={<Tables />} />
        <Route path="/admin/products" element={<Product />} />
        <Route
          path="/admin/update-product/:id"
          element={<UpdateProductDetail />}
        />
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
};

export default App;
