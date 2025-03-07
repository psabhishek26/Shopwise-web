import React from 'react';
import { Navigate } from 'react-router-dom';
import { StorageService } from '../services';

const PrivateRoute = ({ children }) => {
  const token = StorageService.getToken();

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;