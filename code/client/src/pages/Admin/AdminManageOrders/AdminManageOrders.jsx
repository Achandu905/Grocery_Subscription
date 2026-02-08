import React, { useState } from 'react';
import Table from '../../../components/Table/Table';
import './AdminManageOrders.css';

const AdminManageOrders = () => {
    // Dummy order data
    const [orders, setOrders] = useState([
        { id: 201, customer: 'John Doe', amount: 50.00, status: 'Completed' },
        { id: 202, customer: 'Jane Smith', amount: 25.50, status: 'Processing' },
    ]);

    const columns = [
        { key: 'id', label: 'Order Id' },
        { key: 'customer', label: 'Customer' },
        { key: 'amount', label: 'Amount', render: (val) => `$${val.toFixed(2)}` },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <span className={`badge ${value === 'Processing' ? 'bg-primary' : 'bg-success'}`}>
                    {value}
                </span>
            )
        },
    ];

    const actions = [
        { label: 'View Details', type: 'view', className: 'btn-info' },
    ];

    const handleAction = (type, order) => {
        console.log(type, order);
    };

    return (
        <div className="container mt-4">
            <h2>Manage Orders</h2>
            <Table
                columns={columns}
                data={orders}
                actions={actions}
                onActionClick={handleAction}
            />
        </div>
    );
};

export default AdminManageOrders;
