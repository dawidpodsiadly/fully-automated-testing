import React from 'react';
import { Link } from 'react-router-dom';

function AddUserButton() {
    return (
        <Link to="/create" className="btn btn-success btn-lg">
            Add User
        </Link>
    );
}

export default AddUserButton;
