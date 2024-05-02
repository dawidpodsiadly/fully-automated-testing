import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import ConfirmDelete from './ConfirmDelete';

function Users() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3023/')
            .then(res => {
                console.log(res);
                setData(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        setConfirmDelete(id);
    }

    const cancelDelete = () => {
        setConfirmDelete(null);
    }

    const confirmDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3023/deleteuser/${id}`);
            setData(prevData => prevData.filter(user => user._id !== id));
            setConfirmDelete(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="vh-100" style={{ backgroundColor: "#fff" }}>
            <div className="bg-white rounded p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>User Management</h2>
                    <Link to="/create" className="btn btn-success btn-lg">
                        Add User
                    </Link>
                </div>
            </div>
            {!loading && (
                <table className="table flex-grow-1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ddeedf" : "#f2f9f1" }}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {confirmDelete && <ConfirmDelete onCancel={cancelDelete} onConfirm={() => confirmDeleteUser(confirmDelete)} />}
        </div>
    );
}

export default Users;
