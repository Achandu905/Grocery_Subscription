import React, { useState } from 'react';
import Table from '../../../components/Table/Table';
import './VendorManageOrders.css';

const VendorManageOrders = () => {
    // Dummy order data
    const [orders, setOrders] = useState([
        { id: 101, customer: 'John Doe', item: 'Apple', quantity: 5, status: 'Pending' },
        { id: 102, customer: 'Jane Smith', item: 'Milk', quantity: 2, status: 'Shipped' },
    ]);

    const columns = [
        { key: 'id', label: 'Order Id' },
        { key: 'customer', label: 'Customer' },
        { key: 'item', label: 'Item' },
        { key: 'quantity', label: 'Quantity' },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <span className={`badge ${value === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                    {value}
                </span>
            )
        },
    ];

    const actions = [
        { label: 'View', type: 'view', className: 'btn-info' },
        { label: 'Update Status', type: 'update', className: 'btn-success' },
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

export default VendorManageOrders;
