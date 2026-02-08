import React from 'react';
import './Card.css';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`card shadow-sm ${className}`}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;
