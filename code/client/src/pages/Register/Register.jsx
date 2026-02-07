import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import Button from '../../components/Button/Button';
import { ROLES, APARTMENTS } from '../../data/constants';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        address: '',
        role: '',
        apartment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register Data:', formData);
        // In a real app, you would send this to an API
        alert("Registration Successful!");
        navigate('/login');
    };

    return (
        <div className="register-container d-flex justify-content-center align-items-center vh-100">
            <Card className="register-card p-4">
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        required
                    />
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />
                    <InputField
                        label="Mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                        required
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                    <InputField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Address"
                        required
                    />

                    <SelectDropdown
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        options={ROLES}
                        placeholder="Select Role"
                        required
                    />

                    <SelectDropdown
                        label="Apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        options={APARTMENTS}
                        placeholder="Select Apartment"
                        required
                    />

                    <Button type="submit" className="mt-3">Register</Button>
                </form>
            </Card>
        </div>
    );
};

export default Register;
