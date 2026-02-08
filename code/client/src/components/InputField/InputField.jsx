import React from 'react';
import './InputField.css';

const InputField = ({ label, type = "text", name, value, onChange, placeholder, required = false }) => {
    return (
        <div className="mb-3">
            {label && <label htmlFor={name} className="form-label">{label} {required && <span className="text-danger">*</span>}</label>}
            <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default InputField;
