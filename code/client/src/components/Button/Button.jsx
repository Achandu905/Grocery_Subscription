import React from 'react';
import './Button.css';

const Button = ({ children, type = "button", onClick, className = '', disabled = false, fullWidth = true }) => {
    return (
        <button
            type={type}
            className={`btn btn-primary ${fullWidth ? 'w-100' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
