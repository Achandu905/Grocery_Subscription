import React from 'react';
import './SelectDropdown.css';

const SelectDropdown = ({ label, name, value, onChange, options, placeholder = "Select option", required = false }) => {
    return (
        <div className="mb-3">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <select
                className="form-select"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectDropdown;
