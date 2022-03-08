import React from 'react';
import { useNavigate } from 'react-router-dom';
import appRoutes from 'routes';

import './index.scss';

const Error404 = () => {
  const navigate = useNavigate();

  const goToList = () => {
    navigate(appRoutes.HOME);
  };
  return (
    <div className="error-container">
      <p className="error-title">404</p>
      <p className="error-subtitle">Pokemon not found</p>
      <button type="button" className="error-button" onClick={goToList}>
        Go back to list
      </button>
    </div>
  );
};

export default Error404;
