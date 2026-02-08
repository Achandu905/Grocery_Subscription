import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import JS for Dropdown
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Route checks
    const isLogin = location.pathname === '/login';
    const isRegister = location.pathname === '/register';
    const isAuthPage = isLogin || isRegister;

    const isAdmin = location.pathname.startsWith('/admin');
    const isVendor = location.pathname.startsWith('/vendor');
    const isDashboard = isAdmin || isVendor;

    const handleSignout = () => {
        // Clear any auth tokens here if implemented
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid position-relative">
                {/* Brand */}
                <span
                    className={`navbar-brand cursor-pointer fw-bold fs-3 ${isAuthPage ? 'position-absolute top-50 start-50 translate-middle' : ''}`}
                    onClick={() => navigate('/')}
                >
                    Grocery Subscription
                </span>

                {/* Right Side Content */}
                <div className="ms-auto d-flex align-items-center">
                    {/* Auth Buttons */}
                    {isRegister && (
                        <button className="btn auth-header-btn" onClick={() => navigate('/login')}>Login</button>
                    )}
                    {isLogin && (
                        <button className="btn auth-header-btn" onClick={() => navigate('/register')}>Sign Up</button>
                    )}

                    {/* Admin/Vendor Profile Dropdown */}
                    {isDashboard && (
                        <div className="dropdown">
                            <button
                                className="btn auth-header-btn dropdown-toggle d-flex align-items-center"
                                type="button"
                                id="profileDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <div
                                    className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-2"
                                    style={{ width: '30px', height: '30px' }}
                                >
                                    <span style={{ fontSize: '1.2rem', color: '#fff' }}>👤</span>
                                </div>
                                <span>Profile</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li><button className="dropdown-item" type="button">View Profile</button></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item text-danger" type="button" onClick={handleSignout}>Sign Out</button></li>
                            </ul>
                        </div>
                    )}

                    {/* Public/Home View (if not auth/dashboard) */}
                    {!isAuthPage && !isDashboard && (
                        <div className="d-flex">
                            <button className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
                            <button className="btn btn-warning" onClick={() => navigate('/register')}>Register</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
