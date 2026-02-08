import React, { useState } from 'react';
import Table from '../../../components/Table/Table';
import './ManageUsers.css';

const ManageUsers = () => {
    // Dummy user data
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Vendor' },
        { id: 3, name: 'Admin', email: 'admin@example.com', role: 'Admin' },
    ]);

    const columns = [
        { key: 'id', label: 'User Id' },
        { key: 'name', label: 'User Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
    ];

    const actions = [
        { label: 'Edit', type: 'edit', className: 'btn-warning' },
        { label: 'Delete', type: 'delete', className: 'btn-danger' },
    ];

    const handleAction = (type, user) => {
        console.log(type, user);
    };

    return (
        <div className="container mt-4">
            <h2>Manage Users</h2>
            <Table
                columns={columns}
                data={users}
                actions={actions}
                onActionClick={handleAction}
            />
        </div>
    );
};

export default ManageUsers;
