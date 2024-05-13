import React, { useState, useEffect, useCallback } from 'react';
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
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(() => {
        const cachedPage = sessionStorage.getItem('currentPage');
        return cachedPage ? parseInt(cachedPage) : 1;
    });
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

    useEffect(() => {
        sessionStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    const handleToggleActivation = async (userId, isActivated) => {
        try {
            await api.updateUserById(userId, { isActivated: isActivated });
            await fetchData();
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleDelete = (id) => {
        setConfirmDeleteId(id);
    };

    const cancelDelete = () => {
        setConfirmDeleteId(null);
    };

    const confirmDeleteUser = async (id) => {
        try {
            await api.deleteUserById(id);
            await fetchData();
            setConfirmDeleteId(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMassDelete = async () => {
        try {
            await Promise.all(selectedUsers.map(async id => await api.deleteUserById(id)));
            await fetchData();
            setSelectedUsers([]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleCheckboxChange = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(userId => userId !== id));
        } else {
            setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, id]);
        }
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
            <div className="d-flex justify-content-end" style={{ padding: '0rem 0rem 2rem 0rem' }}>
                <button
                    onClick={handleMassDelete}
                    className={`btn btn-danger me-2 ${selectedUsers.length === 0 ? 'disabled' : ''}`}
                    disabled={selectedUsers.length === 0}
                    style={{
                        fontSize: '14px',
                        marginTop: '20px',
                        backgroundColor: selectedUsers.length === 0 ? '#ccc' : undefined,
                        cursor: selectedUsers.length === 0 ? 'not-allowed' : undefined,
                        border: selectedUsers.length === 0 ? 'none' : undefined
                    }}
                >
                    Delete selected Users
                </button>
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
            <UserTable 
                users={paginatedUsers} 
                handleDelete={handleDelete} 
                onCheckboxChange={handleCheckboxChange} 
                selectedUsers={selectedUsers} 
                handleToggleActivation={handleToggleActivation} 
            />
            {confirmDeleteId && <ConfirmDelete id="delete-modal" onCancel={cancelDelete} onConfirm={() => confirmDeleteUser(confirmDeleteId)} />}
        </div>
    );
}

export default UsersPage;
