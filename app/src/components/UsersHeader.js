import React from 'react';
import { Link } from 'react-router-dom';

function UserHeader({ searchTerm, setSearchTerm }) {
    return (
        <div className="bg-white rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
                <h2>User Management</h2>
                <Link to="/create" className="btn btn-success btn-lg">
                    Add User
                </Link>
            </div>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mt-3"
            />
        </div>
    );
}

export default UserHeader;
