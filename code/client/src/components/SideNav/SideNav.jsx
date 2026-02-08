import React, { useState } from 'react';
import './SideNav.css';

const SideNav = ({ menuItems, onMenuItemClick }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidenav bg-dark text-white vh-100 border-end p-3 ${isOpen ? 'open' : 'closed'}`}>
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                {isOpen && <h4 className="m-0">Menu</h4>}
                <button className="btn btn-dark p-0 border-0" onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
            </div>
            <ul className="list-unstyled">
                {menuItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        <button
                            className={`btn sidenav-btn w-100 text-white ${isOpen ? 'text-start' : 'text-center p-2'}`}
                            onClick={() => onMenuItemClick(item.path)}
                            title={!isOpen ? item.label : ''}
                        >
                            {isOpen ? item.label : (
                                <span className="small-icon">
                                    {/* You could add icons to your menuItems data and render them here */}
                                    {item.label.charAt(0)}
                                </span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideNav;
