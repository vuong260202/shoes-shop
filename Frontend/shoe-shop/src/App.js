import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import AccessTransaction from "./components/AccessTransaction";
import Home from "./components/Home";
import Index from "./components/Index";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetails";
import { default as Profile, default as Transaction } from "./components/Profile";
import SetPassword from "./components/SetPasswrod";
import Signup from "./components/Signup";
import Upload from "./components/Upload";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (localStorage.getItem('token') === 'null' || localStorage.getItem('token') === '') {
    <Navigate to='/'/>
  } else {
    <Navigate to='/home'/>
  }

  return (
    <Router>
      <Routes>
        {/* authenticate */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/profile" element={<Profile />}/>
        <Route path="/auth/set-password" element={<SetPassword />}/>
        <Route path="/admin/access-transaction" element={<AccessTransaction />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/upload" element={<Upload />} />
        <Route path="/user/transaction" element={<Transaction />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
};

export default App;
