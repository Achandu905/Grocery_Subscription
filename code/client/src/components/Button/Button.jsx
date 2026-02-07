import React from 'react';
import './Button.css';

const Button = ({ children, type = "button", onClick, className = '', disabled = false }) => {
    return (
        <button
            type={type}
            className={`btn btn-primary w-100 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
