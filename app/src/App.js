import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import UsersPage from './pages/UsersPage'; // Importuj UsersPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} /> {/* Trasa dla UsersPage */}
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
