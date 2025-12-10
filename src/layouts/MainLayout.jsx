import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Home,
  ListChecks,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import ConfirmModal from "../components/common/ConfirmModal";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const askLogout = () => {
    setConfirmOpen(true);
  };

  const active =
    "bg-indigo-600 text-white shadow-md font-semibold tracking-wide";
  const inactive =
    "text-gray-300 hover:text-white hover:bg-gray-700 transition";

  return (
    <>
      <header className="bg-gray-900 text-white shadow-xl sticky top-0 z-[999]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
          <div className="flex items-center justify-between h-16">
 
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Student Management
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? active : inactive} px-4 py-2 rounded-lg flex items-center gap-2`
                }
              >
                <Home size={18} />
                Dashboard
              </NavLink>

              {user?.role === "admin" && (
                <>
                  <NavLink
                    to="/admin/students"
                    className={({ isActive }) =>
                      `${isActive ? active : inactive} px-4 py-2 rounded-lg flex items-center gap-2`
                    }
                  >
                    <UserCircle size={18} />
                    Students
                  </NavLink>

                  <NavLink
                    to="/admin/fields"
                    className={({ isActive }) =>
                      `${isActive ? active : inactive} px-4 py-2 rounded-lg flex items-center gap-2`
                    }
                  >
                    <ListChecks size={18} />
                    Custom Fields
                  </NavLink>
                </>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="text-sm text-gray-300">Hi, {user?.name}</div>

              <button
                onClick={askLogout}
                className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition shadow"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-200 hover:text-white p-2"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-slideDown">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? active : inactive} block px-4 py-3 rounded-lg`
                }
              >
                <Home className="inline-block mr-2" size={18} />
                Dashboard
              </NavLink>

              {user?.role === "admin" && (
                <>
                  <NavLink
                    to="/admin/students"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `${isActive ? active : inactive} block px-4 py-3 rounded-lg`
                    }
                  >
                    <UserCircle className="inline-block mr-2" size={18} />
                    Student Management
                  </NavLink>

                  <NavLink
                    to="/admin/fields"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `${isActive ? active : inactive} block px-4 py-3 rounded-lg`
                    }
                  >
                    <ListChecks className="inline-block mr-2" size={18} />
                    Custom Fields
                  </NavLink>
                </>
              )}

              <button
                onClick={askLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      <ConfirmModal
        open={confirmOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          handleLogout();
          setConfirmOpen(false);
        }}
      />
    </>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
