import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import User from './pages/User/User';
import Vendor from './pages/Vendor/Vendor';
import ManageItems from './pages/Vendor/ManageItems/ManageItems';
import AddItem from './pages/Vendor/AddItem/AddItem';
import VendorManageOrders from './pages/Vendor/VendorManageOrders/VendorManageOrders';
import ManageUsers from './pages/Admin/ManageUsers/ManageUsers';
import AdminManageOrders from './pages/Admin/AdminManageOrders/AdminManageOrders';
import Payment from './pages/Admin/Payment/Payment';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="orders" element={<AdminManageOrders />} />
          <Route path="payment" element={<Payment />} />
        </Route>

        <Route path="/user" element={<User />} />

        {/* Vendor Routes */}
        <Route path="/vendor" element={<Vendor />}>
          <Route index element={<Navigate to="items" replace />} />
          <Route path="items" element={<ManageItems />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="orders" element={<VendorManageOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
