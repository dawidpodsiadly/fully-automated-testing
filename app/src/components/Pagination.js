import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage, setItemsPerPage, itemsPerPage, totalItems }) => {
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onNextPage();
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPrevPage();
        }
    };

    const handleItemsPerPageChange = (e) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            <div>
                Items per page:{' '}
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
            <div>
                Displaying items {((currentPage - 1) * itemsPerPage) + 1} - {Math.min((currentPage * itemsPerPage), totalItems)} of {totalItems}
            </div>

            <style>{`
                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                    font-size: 14px;
                }

                .pagination button {
                    padding: 8px 16px;
                    margin: 0 5px;
                    border: none;
                    background-color: #007bff;
                    color: #fff;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .pagination button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .pagination select {
                    padding: 5px;
                    margin: 0 10px;
                }

                .pagination div {
                    margin: 0 10px;
                }
            `}</style>
        </div>
    );
};

export default Pagination;
