import React from 'react';
import { Link } from 'react-router-dom';

function UserTableRow({ user, handleDelete, index }) {
    return (
        <tr style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2" }}>
            <td style={{ wordWrap: 'break-word', maxWidth: '150px' }}>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.notes}</td>
            <td>{user.lastUpdated}</td>
            <td>
                <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>
    );
}

function UserTable({ users, handleDelete }) {
    return (
        <table className="table flex-grow-1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Notes</th>
                    <th>Last Updated</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <UserTableRow key={index} user={user} handleDelete={handleDelete} index={index} />
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;
