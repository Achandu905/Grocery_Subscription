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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = () => {
        console.log('Register Data:', formData);
        alert('Registration Successful!');
        navigate('/login');
    };

    return (
        <div className="register-container d-flex justify-content-center align-items-center vh-100">
            <Card className="register-card p-4">
                <h2 className="text-center mb-4">Register</h2>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <InputField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <InputField
                            label="Mobile"
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter Mobile Number"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <InputField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter Address"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <SelectDropdown
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            options={ROLES}
                            placeholder="Select Role"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <SelectDropdown
                            label="Apartment"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleChange}
                            options={APARTMENTS}
                            placeholder="Select Apartment"
                        />
                    </div>
                </div>

                <Button className="mt-3" onClick={handleRegister}>
                    Register
                </Button>
            </Card>
        </div>
    );
};

export default Register;
