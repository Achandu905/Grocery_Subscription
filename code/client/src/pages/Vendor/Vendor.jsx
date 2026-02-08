import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideNav from '../../components/SideNav/SideNav';
import './Vendor.css';

const Vendor = () => {
    const navigate = useNavigate();

    const menuItems = [
        { label: 'Manage Items', path: '/vendor/items' },
        { label: 'Manage Orders', path: '/vendor/orders' },
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

export default Vendor;
