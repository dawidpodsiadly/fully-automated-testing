import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './pages/CreateUserPage';
import UpdateUser from './pages/UpdateUserPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
