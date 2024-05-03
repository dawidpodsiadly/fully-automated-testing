import React from 'react';
import { useParams } from 'react-router-dom';
import CreateUpdateUser from '../components/CreateUpdateUser';

function UpdateUserPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Update User</h1>
            <CreateUpdateUser userId={id} />
        </div>
    );
}

export default UpdateUserPage;
