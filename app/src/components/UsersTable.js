import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserTableRow({ user, handleDelete, onCheckboxChange, isChecked, id, handleToggleActivation, index }) {
    const [isHovered, setIsHovered] = useState(false);

    const statusColor = user.isActivated ? 'text-success' : 'text-danger';
    const statusDot = user.isActivated ? '●' : '●';

    const rowStyle = {
        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5'
    };

    return (
        <tr id={id} style={rowStyle}>
            <td className="text-center">
                <input type="checkbox" onChange={() => onCheckboxChange(user._id)} checked={isChecked} />
            </td>
            <td className="text-center">
                <span className={statusColor}>{statusDot}</span>
            </td>
            <td className="text-center" style={{ maxWidth: '150px' }}>{user.name}</td>
            <td className="text-center">{user.email}</td>
            <td className="text-center">{user.age}</td>
            <td className="text-center">{user.notes}</td>
            <td className="text-center">{user.lastUpdated}</td>
            <td className="text-left">
                <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => handleDelete(user._id)}
                    className={`btn btn-sm btn-danger me-2 ${isHovered ? "bg-danger border-danger" : ""}`}
                >
                    Delete
                </button>
                <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => handleToggleActivation(user._id, !user.isActivated)}
                    className={`btn btn-sm btn-primary btn-dark ${isHovered ? (user.isActivated ? "bg-danger border-danger" : "bg-success border-success") : ""}`}
                >
                    {user.isActivated ? 'Deactivate' : 'Activate'}
                </button>
            </td>
        </tr>
    );
}

function UserTable({ users, handleDelete, onCheckboxChange, selectedUsers, handleToggleActivation }) {
    return (
        <table id="users-table" className="table flex-grow-1">
            <thead>
                <tr>
                    <th></th>
                    <th className="text-center">User Status</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Age</th>
                    <th className="text-center">Notes</th>
                    <th className="text-center">Last Updated</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <UserTableRow
                        key={index}
                        id={`table-user-row-${index}`}
                        user={user}
                        handleDelete={handleDelete}
                        onCheckboxChange={onCheckboxChange}
                        isChecked={selectedUsers.includes(user._id)}
                        handleToggleActivation={handleToggleActivation}
                        index={index}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;
