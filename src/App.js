import React from 'react';
import { BrowserRouter } from "react-router-dom";

import AuthRoutes from './ui/routes/auth/AuthRoutes'
import { AuthProvider } from './context/auth/AuthContext';

function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
          <AuthRoutes />
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App;