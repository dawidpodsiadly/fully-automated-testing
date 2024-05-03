import React from 'react';
import CreateUpdateUser from '../components/UpdateUserForm';
import { useParams } from 'react-router-dom';

function UpdateUserPage() {
    const { id } = useParams();

    return (
        <div>
            <CreateUpdateUser userId={id} />
        </div>
    );
}

export default UpdateUserPage;
