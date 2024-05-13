import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtil";

const UserForm = ({ id, onSubmit, defaultValues }) => {
  const [name, setName] = useState(defaultValues?.name || "");
  const [email, setEmail] = useState(defaultValues?.email || "");
  const [age, setAge] = useState(defaultValues?.age || "");
  const [notes, setNotes] = useState(defaultValues?.notes || "");
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isActivated, setIsActivated] = useState(defaultValues?.isActivated || false);

  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.name || "");
      setEmail(defaultValues.email || "");
      setAge(defaultValues.age || "");
      setNotes(defaultValues.notes || "");
      setLastUpdated(new Date(defaultValues.lastUpdated));
      setIsActivated(defaultValues.isActivated || false);
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageValue = age ? parseInt(age) : null;
    if (age && (isNaN(ageValue) || ageValue <= 0)) {
      setError("Enter correct age");
      return;
    }
    setError("");
    const userData = { name, email, age: ageValue, lastUpdated, notes, isActivated };
    onSubmit(userData);
  };

  return (
    <div id={id} className="w-50 bg-white rounded p-3">
      <form onSubmit={handleSubmit}>
        <h2>{defaultValues ? 'Update User' : 'Add User'}</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id={`${id}-name`}
            type="text"
            placeholder="Enter Name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id={`${id}-email`}
            type="email"
            placeholder="Enter Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            id={`${id}-age`}
            type="text"
            placeholder="Enter Age"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="last-updated" className="form-label">Last Updated</label>
          <input
            id={`${id}-last-updated`}
            type="text"
            className="form-control"
            value={formatDate(lastUpdated)}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            id={`${id}-notes`}
            placeholder="Enter Notes"
            className="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            id={`${id}-is-activated`}
            type="checkbox"
            className="form-check-input"
            checked={isActivated}
            onChange={(e) => setIsActivated(e.target.checked)}
          />
          <label htmlFor={`${id}-is-activated`} className="form-check-label">Is Activated</label>
        </div>
        <button id={`${id}-submit-button`} className="btn btn-success me-2">Submit</button>
        <Link id={`${id}-cancel-cutton`} to="/" className="btn btn-secondary">Cancel</Link>
      </form>
    </div>
  );
};

export default UserForm;
