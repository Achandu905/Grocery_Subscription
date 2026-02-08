import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
            return newErrors;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            return newErrors;
        }
        return newErrors;
    };

    const handleLogin = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log('Login Data:', formData);

        const email = formData.email.toLowerCase();

        if (email.includes('admin')) {
            navigate('/admin');
        } else if (email.includes('vendor')) {
            navigate('/vendor');
        } else {
            navigate('/user');
        }
    };

    return (
        <div className="d-flex flex-col min-vh-100">
            <Header />
            <div className="login-container d-flex justify-content-center align-items-center flex-grow-1 my-5">
                <Card className="login-card p-4">
                    <h2 className="text-center mb-4">Login</h2>

                    <div className="row">
                        <div className="col-12 mb-3">
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

                        <div className="col-12 mb-3">
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

                        <div className="col-12">
                            <Button className="mt-2 w-100" onClick={handleLogin}>
                                Login
                            </Button>
                        </div>

                        <div className="col-12 text-center mt-3">
                            <span className="text-muted">Don't have an account? </span>
                            <span
                                className="text-primary cursor-pointer"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
