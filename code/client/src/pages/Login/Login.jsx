import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        console.log('Login Data:', formData);

        // Simulate login logic based on email for testing since we don't have backend yet
        // In a real app, response would contain role
        // For demo purposes:
        // admin@test.com -> Admin
        // vendor@test.com -> Vendor
        // user@test.com -> User (default)

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
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <Card className="login-card p-4">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
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
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                    <Button type="submit" className="mt-3">Login</Button>
                    <div className="text-center mt-3">
                        <span className="text-muted">Don't have an account? </span>
                        <a href="/register" className="text-decoration-none">Register</a>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;
