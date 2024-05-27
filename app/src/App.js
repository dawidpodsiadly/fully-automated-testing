import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './pages/CreateUserPage';
import UpdateUser from './pages/UpdateUserPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import UserDetails from './pages/UserDetailsPage';
import ProtectedRoute from './utils/auth.util';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute element={<UsersPage />} />} />
        <Route path="/create" element={<ProtectedRoute element={<CreateUser />} />} />
        <Route path="/edit/:id" element={<ProtectedRoute element={<UpdateUser />} />} />
        <Route path="/userDetails/:id" element={<ProtectedRoute element={<UserDetails />} />} />
      </Routes>
    </Router>
  );
}

export default App;
