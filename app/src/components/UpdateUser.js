import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import apis from "../api/api";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    apis.getUserById(id)
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (userData) => {
    apis.updateUserById(id, userData)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center border rounded">
      {userData && <UserForm onSubmit={handleSubmit} defaultValues={userData} />}
    </div>
  );
}

export default UpdateUser;
