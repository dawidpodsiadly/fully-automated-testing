import React from 'react';

function UnauthorizedPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 bg-white rounded p-3 text-center">
        <h2>Unauthorized</h2>
        <p>You do not have access to this page.</p>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
