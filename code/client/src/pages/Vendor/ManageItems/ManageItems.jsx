import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Table from '../../../components/Table/Table';
import './ManageItems.css';

const ManageItems = () => {
    const navigate = useNavigate();
    // Dummy item data
    const [items, setItems] = useState([
        { id: 1, name: 'Apple', price: 1.2 },
        { id: 2, name: 'Banana', price: 0.8 },
        { id: 3, name: 'Milk', price: 3.0 },
        { id: 4, name: 'Bread', price: 2.5 },
        { id: 5, name: 'Eggs', price: 4.0 },
        { id: 6, name: 'Cheese', price: 5.0 },
        { id: 7, name: 'Chicken', price: 8.0 },
        { id: 8, name: 'Rice', price: 10.0 },
        { id: 9, name: 'Pasta', price: 1.5 },
        { id: 10, name: 'Tomato', price: 0.5 },
        { id: 11, name: 'Potato', price: 0.6 },
        { id: 12, name: 'Onion', price: 0.7 },
    ]);

    const columns = [
        { key: 'id', label: 'Item Id' },
        { key: 'name', label: 'Item Name' },
        { key: 'price', label: 'Price', render: (value) => `$${value.toFixed(2)}` },
    ];

    const actions = [
        { label: 'Edit', type: 'edit', className: 'btn-primary' },
        { label: 'Delete', type: 'delete', className: 'btn-danger' },
    ];

    const handleAction = (type, item) => {
        if (type === 'edit') {
            console.log('Edit item:', item);
        } else if (type === 'delete') {
            console.log('Delete item:', item);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
                <h2>Manage Items</h2>
                <Button onClick={() => navigate('/vendor/add-item')} fullWidth={false} className="btn-sm">Add Item</Button>
            </div>
            <Table
                columns={columns}
                data={items}
                actions={actions}
                onActionClick={handleAction}
            />
        </div>
    );
};

export default ManageItems;
