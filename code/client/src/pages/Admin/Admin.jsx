import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideNav from '../../components/SideNav/SideNav';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();

    const menuItems = [
        { label: 'Manage Users', path: '/admin/users' },
        { label: 'Manage Orders', path: '/admin/orders' },
        { label: 'Payment', path: '/admin/payment' },
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="d-flex flex-grow-1">
                <SideNav menuItems={menuItems} onMenuItemClick={navigate} />
                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Admin;
