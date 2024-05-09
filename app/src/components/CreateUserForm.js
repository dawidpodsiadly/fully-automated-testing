import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import apis from "../api/api";

function CreateUser() {
  const navigate = useNavigate();

  const handleSubmit = (userData) => {
    apis.insertUser(userData)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center border rounded">
      <UserForm id="create-user-form" onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateUser;
