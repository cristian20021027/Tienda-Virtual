import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías limpiar algún estado o token si usas uno
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Panel Admin</h1>
      <div className="flex items-center gap-4">
        <p className="text-amber-400 font-bold uppercase">Admin</p>
      </div>
    </nav>
  );
};

export default AdminNavbar;
