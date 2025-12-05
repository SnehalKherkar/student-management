
import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import { seedInitialData } from './api/storage';

function App() {
  useEffect(() => {
    seedInitialData();
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
