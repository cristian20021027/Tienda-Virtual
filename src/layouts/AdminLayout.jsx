// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import {
  MdDashboard,
  MdInbox,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdEditSquare } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const Menus = [
    { title: "Dashboard", icon: <MdDashboard className="text-blue-500" />, route: "/admin" },
    { title: "Agregar Gorras", icon: <BiSolidAddToQueue
      className="text-green-500" />, route: "/admin/agregar-gorra" },
    { title: "Ver Carrito", icon: <FaShoppingCart BiSolidAddToQueueclassName="text-orange-500" />, route: "/admin/ver-carrito" },
    { title: "Gorras", icon: <MdEditSquare  className="text-green-500" />, gap: true, route: "/admin/admin-gorras" },
    { title: "Cerrar sesión", icon: <MdLogout className="text-red-600" />, route: "/login", gap: true },
  ];

  const handleClick = async (menu) => {
    if (menu.title === "Cerrar sesión") {
      await supabase.auth.signOut();
      console.log("Sesión cerrada exitosamente");
      navigate("/login");
    } else if (menu.route) {
      navigate(menu.route);
    }
  };
  return (
    <ProtectedRoute>
    <div className="flex">
      {/* Sidebar */}
      <div className={` ${open ? "w-72" : "w-20"} bg-gray-800 h-screen p-5 pt-8 relative duration-300`}>
        <FaAngleRight
          className={`absolute cursor-pointer -right-3 top-9 w-5 h-5 bg-amber-400 border-2 border-amber-400 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src="/src/assets/logo.png" className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>Designer</h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleClick(menu)}
              className={`flex items-center gap-x-4 p-2 cursor-pointer rounded-md hover:bg-light-white text-gray-300 text-sm
              ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
            >
              <span className="text-lg">{menu.icon}</span>
              <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido que cambia */}
      <div className="h-screen flex-1  overflow-y-auto">
        <Outlet />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
