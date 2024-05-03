// import React, { useEffect, useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import ConfirmDelete from './ConfirmDelete';
// import { formatDate } from '../utils/dateUtil'; // Importujemy funkcję formatDate

// function Users() {
//     const [data, setData] = useState([]);
//     const [confirmDelete, setConfirmDelete] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = () => {
//         api.getAllUsers()
//             .then(res => {
//                 const formattedData = res.data.map(user => ({
//                     ...user,
//                     lastUpdated: formatDate(user.lastUpdated) // Używamy funkcji formatDate
//                 }));
//                 setData(formattedData);
//                 setLoading(false);
//             })
//             .catch(err => console.log(err));
//     }

//     const handleDelete = (id) => {
//         setConfirmDelete(id);
//     }

//     const cancelDelete = () => {
//         setConfirmDelete(null);
//     }

//     const confirmDeleteUser = async (id) => {
//         try {
//             await api.deleteUserById(id);
//             setData(prevData => prevData.filter(user => user._id !== id));
//             setConfirmDelete(null);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const filteredUsers = data.filter(user =>
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="vh-100" style={{ backgroundColor: "#fff" }}>
//             <div className="bg-white rounded p-3 mb-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                     <h2>User Management</h2>
//                     <Link to="/create" className="btn btn-success btn-lg">
//                         Add User
//                     </Link>
//                 </div>
//                 <input
//                     type="text"
//                     placeholder="Search by name or email..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="form-control mt-3"
//                 />
//             </div>
//             {!loading && (
//                 <table className="table flex-grow-1">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Age</th>
//                             <th>Notes</th>
//                             <th>Last Updated</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.map((user, index) => (
//                             <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2" }}>
//                                 <td style={{ wordWrap: 'break-word', maxWidth: '150px' }}>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.age}</td>
//                                 <td>{user.notes}</td>
//                                 <td>{user.lastUpdated}</td>
//                                 <td>
//                                     <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
//                                     <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//             {confirmDelete && <ConfirmDelete onCancel={cancelDelete} onConfirm={() => confirmDeleteUser(confirmDelete)} />}
//         </div>
//     );
// }

// export default Users;
