import React from 'react';
import '../css/Pagination.css';

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
        </div>
    );
};

export default Pagination;
