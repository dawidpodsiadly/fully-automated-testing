import React, { useState, useEffect, useCallback } from 'react'; // Dodajemy useCallback
import api from '../api/api';
import UserTable from '../components/UsersTable';
import ConfirmDelete from '../components/ConfirmDelete';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import AddUserButton from '../components/AddUserButton';
import { formatDate } from '../utils/dateUtil';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const fetchData = useCallback(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;

        api.getAllUsers(startIndex, itemsPerPage)
            .then(res => {
                const formattedUsers = res.data.map(user => ({
                    ...user,
                    lastUpdated: formatDate(user.lastUpdated)
                }));
                setUsers(formattedUsers);
            })
            .catch(err => console.log(err));
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = (id) => {
        setConfirmDeleteId(id);
    }

    const cancelDelete = () => {
        setConfirmDeleteId(null);
    }

    const confirmDeleteUser = async (id) => {
        try {
            await api.deleteUserById(id);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            setConfirmDeleteId(null);
        } catch (error) {
            console.log(error);
        }
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="vh-100" style={{ backgroundColor: "#fff" }}>
            <div className="d-flex justify-content-between align-items-center" style={{ padding: '1rem 0.5rem 0.1rem' }}>
                <div style={{ paddingRight: '10px' }}>
                    <h2>User Management</h2>
                    <SearchBar 
                        id="search-input"
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        style={{ width: '40rem' }}
                    />
                </div>
                <div>
                    <AddUserButton id="add-user-button"/>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Pagination
                    id="pagination"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    setItemsPerPage={setItemsPerPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredUsers.length}
                />
            </div>
            <UserTable users={paginatedUsers} handleDelete={handleDelete} />
            {confirmDeleteId && <ConfirmDelete id="delete-modal" onCancel={cancelDelete} onConfirm={() => confirmDeleteUser(confirmDeleteId)} />}
        </div>
    );
}

export default UsersPage;
