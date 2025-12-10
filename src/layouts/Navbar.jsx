import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Home, ListChecks, UserCircle, LogOut, Menu, X } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";

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
    setConfirmTitle("Logout");
    setConfirmMessage("Are you sure you want to logout?");
    setConfirmAction(() => handleLogout);
    setConfirmOpen(true);
  };

  return (
    <>
      <header className="bg-[#0f1724] text-white sticky top-0 z-40 shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-extrabold bg-clip-text text-transparent" style={{
                background: "linear-gradient(90deg,#6d28d9,#ec4899)"
              }}>
                Student Management
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={({isActive}) => isActive ? "px-3 py-2 rounded-md bg-indigo-600 text-white" : "px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800/60"}>
                <Home size={16} className="inline mr-2" /> Dashboard
              </NavLink>

              {user?.role === "admin" && (
                <>
                  <NavLink to="/admin/students" className={({isActive}) => isActive ? "px-3 py-2 rounded-md bg-indigo-600 text-white" : "px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800/60"}>
                    <UserCircle size={16} className="inline mr-2" /> Students
                  </NavLink>

                  <NavLink to="/admin/fields" className={({isActive}) => isActive ? "px-3 py-2 rounded-md bg-indigo-600 text-white" : "px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800/60"}>
                    <ListChecks size={16} className="inline mr-2" /> Custom Fields
                  </NavLink>
                </>
              )}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:block text-gray-200">Hi, {user?.name}</div>

              <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 rounded-md bg-white/5">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <button onClick={handleLogoutClick} className="ml-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden py-2 space-y-1">
              <NavLink to="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-gray-200 hover:bg-gray-800/60">Dashboard</NavLink>
              {user?.role === "admin" && (
                <>
                  <NavLink to="/admin/students" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-gray-200 hover:bg-gray-800/60">Students</NavLink>
                  <NavLink to="/admin/fields" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-gray-200 hover:bg-gray-800/60">Custom Fields</NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); setConfirmOpen(false); }}
      />
    </>
  );
};

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default Header;
