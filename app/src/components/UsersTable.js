import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function UserTableRow({ user, handleDelete, onCheckboxChange, isChecked, id, handleToggleActivation, index }) {
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const [isActivationHovered, setIsActivationHovered] = useState(false);

    const statusColor = user.isActivated ? 'text-success' : 'text-danger';
    const statusDot = user.isActivated ? '●' : '●';

    const rowStyle = {
        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5'
    };

    const handleCheckboxClick = () => {
        onCheckboxChange(user._id);
    };

    return (
        <tr id={id} style={rowStyle}>
            <td className="text-center">
                <input type="checkbox" onChange={handleCheckboxClick} checked={isChecked} />
            </td>
            <td className="text-center">
                <span className={statusColor}>{statusDot}</span>
            </td>
            <td className="text-center" style={{ maxWidth: '150px' }}>{user.name} {user.username}</td>
            <td className="text-center">{user.email}</td>
            <td className="text-center">{user.phoneNumber}</td>
            <td className="text-center">{user.contract?.type}</td>
            <td className="text-center">{user.contract?.startTime ? new Date(user.contract.startTime).toLocaleDateString() : ''}</td>
            <td className="text-center">{user.contract?.endTime ? new Date(user.contract.endTime).toLocaleDateString() : ''}</td>
            <td className="text-center">{user.contract?.position}</td>
            <td className="text-center">{user.lastUpdated}</td>
            <td className="text-left">
                <Link to={`/edit/${user._id}`} id={`${id}-update-button`} className="btn btn-sm btn-success me-2">Update</Link>
                <button
                    id={`${id}-delete-button`}
                    onMouseEnter={() => setIsDeleteHovered(true)}
                    onMouseLeave={() => setIsDeleteHovered(false)}
                    onClick={() => handleDelete(user._id)}
                    className={`btn btn-sm btn-danger me-2 ${isDeleteHovered ? "bg-danger border-danger" : ""}`}
                >
                    Delete
                </button>
                <button
                    id={`${id}-deactivate-button`}
                    onMouseEnter={() => setIsActivationHovered(true)}
                    onMouseLeave={() => setIsActivationHovered(false)}
                    onClick={() => handleToggleActivation(user._id, !user.isActivated)}
                    className={`btn btn-sm btn-primary btn-dark ${isActivationHovered ? (user.isActivated ? "bg-danger border-danger" : "bg-success border-success") : ""}`}
                >
                    {user.isActivated ? 'Deactivate' : 'Activate'}
                </button>
            </td>
        </tr>
    );
}

function UserTable({ users, handleDelete, onCheckboxChange, handleToggleActivation, selectedUsers }) {
    return (
        <table id="users-table" className="table flex-grow-1">
            <thead>
                <tr>
                    <th>
                    </th>
                    <th className="text-center">User Status</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Phone Number</th>
                    <th className="text-center">Contract Type</th>
                    <th className="text-center">Start Time</th>
                    <th className="text-center">End Time</th>
                    <th className="text-center">Position</th>
                    <th className="text-center">Last Updated</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <UserTableRow
                        key={user._id}
                        id={`table-user-row-${user._id}`}
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
