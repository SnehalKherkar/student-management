import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Home, ListChecks, UserCircle, LogOut, Menu, X } from "lucide-react";
import ConfirmModal from "../components/common/ConfirmModal"; 

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");

 
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setConfirmTitle("Logout Confirmation");
    setConfirmMessage("Are you sure you want to logout?");
    setConfirmAction(() => handleLogout); 
    setConfirmOpen(true);
  };

  const activeLinkClass = "bg-gray-700 text-white";
  const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <>
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Student Management System</h1>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? activeLinkClass : inactiveLinkClass
                  } px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2`
                }
              >
                <Home size={16} />
                Dashboard
              </NavLink>

              {user?.role === "admin" && (
                <>
                  <NavLink
                    to="/admin/students"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeLinkClass : inactiveLinkClass
                      } px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2`
                    }
                  >
                    <UserCircle size={16} />
                    Student Management
                  </NavLink>

                  <NavLink
                    to="/admin/fields"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeLinkClass : inactiveLinkClass
                      } px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2`
                    }
                  >
                    <ListChecks size={16} />
                    Custom Fields
                  </NavLink>
                </>
              )}
            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden md:flex items-center ml-4">
              <span className="mr-4">Welcome, {user?.name}</span>

            
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-2 space-y-1 px-2 pb-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? activeLinkClass : inactiveLinkClass
                  } block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2`
                }
                onClick={() => setMenuOpen(false)}
              >
                <Home size={16} /> Dashboard
              </NavLink>

              {user?.role === "admin" && (
                <>
                  <NavLink
                    to="/admin/students"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeLinkClass : inactiveLinkClass
                      } block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <UserCircle size={16} /> Student Management
                  </NavLink>

                  <NavLink
                    to="/admin/fields"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeLinkClass : inactiveLinkClass
                      } block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <ListChecks size={16} /> Custom Fields
                  </NavLink>
                </>
              )}
              <button
                onClick={handleLogoutClick}
                className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (confirmAction) confirmAction();
          setConfirmOpen(false);
        }}
      />
    </>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
