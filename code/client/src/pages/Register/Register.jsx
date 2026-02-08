import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) {
            newErrors.fullName = 'Full Name is required';
            return newErrors;
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
            return newErrors;
        }
        if (!formData.mobile) {
            newErrors.mobile = 'Mobile is required';
            return newErrors;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            return newErrors;
        }
        if (!formData.address) {
            newErrors.address = 'Address is required';
            return newErrors;
        }
        if (!formData.role) {
            newErrors.role = 'Role is required';
            return newErrors;
        }
        if (!formData.apartment) {
            newErrors.apartment = 'Apartment is required';
            return newErrors;
        }
        return newErrors;
    };

    const handleRegister = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log('Register Data:', formData);
        alert('Registration Successful!');
        navigate('/login');
    };

    return (
        <div className="d-flex flex-col min-vh-100">
            <Header />
            <div className="register-container d-flex justify-content-center align-items-center flex-grow-1 my-5">
                <Card className="register-card p-4">
                    <h2 className="text-center mb-4">Register</h2>

                    <div className="d-flex flex-wrap -mx-3">
                        <div className="col-12 col-md-6 px-2 mb-3">
                            <InputField
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter Full Name"
                                required={true}
                            />
                            {errors.fullName && <div className="text-danger small">{errors.fullName}</div>}
                        </div>

                        <div className="col-12 col-md-6 px-2 mb-3">
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                                required={true}
                            />
                            {errors.email && <div className="text-danger small">{errors.email}</div>}
                        </div>

                        <div className="col-12 col-md-6 px-2 mb-3">
                            <InputField
                                label="Mobile"
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter Mobile Number"
                                required={true}
                            />
                            {errors.mobile && <div className="text-danger small">{errors.mobile}</div>}
                        </div>

                        <div className="col-12 col-md-6 px-2 mb-3">
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                required={true}
                            />
                            {errors.password && <div className="text-danger small">{errors.password}</div>}
                        </div>

                        <div className="col-12 col-md-6 px-2 mb-3">
                            <InputField
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter Address"
                                required={true}
                            />
                            {errors.address && <div className="text-danger small">{errors.address}</div>}
                        </div>

                        <div className="col-12 col-md-6 px-2 mb-3">
                            <SelectDropdown
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                options={ROLES}
                                placeholder="Select Role"
                            />
                            {errors.role && <div className="text-danger small">{errors.role}</div>}
                        </div>

                        <div className="col-12 col-md-6 px-2 mb-3">
                            <SelectDropdown
                                label="Apartment"
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleChange}
                                options={APARTMENTS}
                                placeholder="Select Apartment"
                            />
                            {errors.apartment && <div className="text-danger small">{errors.apartment}</div>}
                        </div>
                    </div>

                    <Button className="mt-3 w-100" onClick={handleRegister}>
                        Register
                    </Button>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
