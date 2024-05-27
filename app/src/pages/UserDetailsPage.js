import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apis from '../api/api';
import { dateTimeFormat } from '../utils/date.util';
import BackButton from '../components/BackButton'; 

function UserDetailsPage() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apis.getUserById(id);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        return () => {
            setUserData(null);
        };
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center mb-4">
                <BackButton />
                <h2 className="mb-0 ms-2">User Details</h2>
            </div>
            {userData && (
                <div className="card">
                    <div className="card-body">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Surname:</strong> {userData.surname}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Phone Number:</strong> {userData.phoneNumber || 'N/A'}</p>
                        <p><strong>Birth Date:</strong> {userData.birthDate ? dateTimeFormat(userData.birthDate) : 'N/A'}</p>
                        <p><strong>Contract Type:</strong> {userData.contract.type || 'N/A'}</p>
                        <p><strong>Salary:</strong> {userData.contract.salary || 'N/A'}</p>
                        <p><strong>Position:</strong> {userData.contract.position || 'N/A'}</p>
                        <p><strong>Start Time:</strong> {userData.contract.startTime ? dateTimeFormat(userData.contract.startTime) : 'N/A'}</p>
                        <p><strong>End Time:</strong> {userData.contract.endTime ? dateTimeFormat(userData.contract.endTime) : 'N/A'}</p>
                        <p><strong>Notes:</strong> {userData.notes || 'N/A'}</p>
                        <p><strong>Admin:</strong> {userData.isAdmin ? 'Yes' : 'No'}</p>
                        <p><strong>Activated:</strong> {userData.isActivated ? 'Yes' : 'No'}</p>
                        <p><strong>Last Updated:</strong> {userData.lastUpdated ? dateTimeFormat(userData.lastUpdated) : 'N/A'}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetailsPage;
