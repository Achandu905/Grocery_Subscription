import React, { useState, useEffect, useRef } from 'react';
import './Table.css';

const Table = ({ columns, data, actions, onActionClick }) => {
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Action Menu State
    const [openMenuRowIndex, setOpenMenuRowIndex] = useState(null);
    const menuRef = useRef(null);

    // Calculate Slice
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const toggleMenu = (index, event) => {
        event.stopPropagation();
        setOpenMenuRowIndex(openMenuRowIndex === index ? null : index);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuRowIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="table-responsive" style={{ minHeight: '400px' }}> {/* Added min-height to ensure space for dropdown */}
            <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        {actions && <th style={{ width: '50px', textAlign: 'center' }}>Actions</th>} {/* Actions column */}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="position-relative text-center">
                                        <button
                                            className="btn btn-sm btn-link text-dark p-0"
                                            onClick={(e) => toggleMenu(rowIndex, e)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            </svg>
                                        </button>
                                        {openMenuRowIndex === rowIndex && (
                                            <div className="action-menu dropdown-menu show" ref={menuRef} style={{ position: 'absolute', right: 0, top: '100%', zIndex: 1000 }}>
                                                {actions.map((action, actionIndex) => (
                                                    <button
                                                        key={actionIndex}
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            onActionClick && onActionClick(action.type, row);
                                                            setOpenMenuRowIndex(null);
                                                        }}
                                                    >
                                                        {action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-3 flex-wrap">
                    <button
                        className="btn pagination-btn me-1"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`btn pagination-btn me-1 ${currentPage === pageNumber ? 'active' : ''}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        className="btn pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default Table;
