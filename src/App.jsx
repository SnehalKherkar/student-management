import React, { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import { seedInitialData } from "./api/storage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    seedInitialData();
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </AuthProvider>
  );
}

export default App;
