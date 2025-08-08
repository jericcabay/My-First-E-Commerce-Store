import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import Orders from './components/Orders.jsx';
import ProductsCard from './components/ProductsCard.jsx';

import LoginPages from './pages/LoginPages.jsx';
import SignupPages from './pages/SignupPages.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminPages from './pages/AdminPages.jsx';
import CategoryPages from './pages/CategoryPages.jsx';
import ProfilePages from './pages/ProfilePages.jsx';
import RegisterSellerForm from './pages/RegisterSellerForm.jsx';
import StaffListView from './pages/StaffListView.jsx';
import CartPage from './pages/CartPage.jsx';

import { authUser } from './api/authApi.js';
import { CartApi } from './api/cartApi.js';
import RegisterRiderForm from './pages/RegisterRiderForm.jsx';

function App() {
  const { user, profile, checkingAuth } = authUser();
  const { GetCartItems } = CartApi();

  useEffect(() => {
    profile();
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    GetCartItems();
  }, [GetCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-r from-purple-500 to-cyan-300 p-8 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={!user ? <SignupPages /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <LoginPages /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <ProfilePages /> : <Navigate to="/"/>} />
          <Route path="/sellerForm" element={user ? <RegisterSellerForm /> : <Navigate to="/"/>} />
          <Route path="/seller" element={user ? <AdminPages /> : <Navigate to="/" />} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/" />} />
          <Route path="/card" element={user ? <ProductsCard /> : <Navigate to="/"/>} />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/"/>} />
          <Route path="/staff" element={user ? <StaffListView /> : <Navigate to="/"/>} />
          <Route path="/category/:category" element={user ? <CategoryPages /> : <Navigate to="/"/>} />
          <Route path="/rider" element={user ? <RegisterRiderForm /> : <Navigate to="/"/>} />
        </Routes>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
