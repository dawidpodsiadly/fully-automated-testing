import React from 'react';

const ConfirmDelete = ({ onCancel, onConfirm }) => {
    return (
        <div className="confirm-delete-overlay">
            <div className="confirm-delete">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p className="mb-3">Are you sure that you want to remove user?</p>
                            <div className="d-flex justify-content-center">
                                <button onClick={onCancel} className="btn btn-secondary me-2">Cancel</button>
                                <button onClick={onConfirm} className="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDelete;

// Style CSS
const styles = `
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
}

.confirm-delete {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-dialog {
    margin: 0;
}
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
