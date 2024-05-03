import React from 'react';

const ConfirmDelete = ({ onCancel, onConfirm }) => {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('confirm-delete-overlay')) {
            onCancel();
        }
    };

    return (
        <div className="confirm-delete-overlay" onClick={handleOverlayClick}>
            <style>
                {`
                .confirm-delete-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 999;
                }

                .confirm-delete {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                }

                .modal-content {
                    border: none;
                    pointer-events: auto;
                }
                `}
            </style>
            <div className="confirm-delete">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p className="mb-3">Are you sure that you want to delete user?</p>
                            <div className="d-flex justify-content-center">
                                <button onClick={onConfirm} className="btn btn-danger me-2">Delete</button>
                                <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDelete;
