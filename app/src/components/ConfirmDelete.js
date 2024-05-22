import React from 'react';
import '../css/ConfirmDelete.css';

const ConfirmDelete = ({ id, onCancel, onConfirm, onDelete }) => {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('confirm-delete-overlay')) {
            onCancel();
        }
    };

    return (
        <div id={id} className="confirm-delete-overlay" onClick={handleOverlayClick}>
            <div className="confirm-delete">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p className="mb-3">Are you sure that you want to delete user?</p>
                            <div className="d-flex justify-content-center">
                            <button id={`${id}-delete-button`} onClick={() => { onConfirm(); onDelete(); }} className="btn btn-danger me-2">Delete</button>
                            <button id={`${id}-cancel-button`} onClick={onCancel} className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ConfirmDelete;
