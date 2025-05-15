import React from "react";
import { MdDashboard, MdInbox, MdAccountCircle, MdLogout } from "react-icons/md";
import { GiBilledCap} from "react-icons/gi"; // Icono de gorra
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Admin = () => {
  const navigate = useNavigate();

  const handleClick = async (menu) => {
    if (menu.title === "Cerrar sesión") {
      await handleLogout();
    } else if (menu.route) {
      navigate(menu.route);
    }
  };
   const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Sesión cerrada exitosamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <div className="bg-gray-800 border-4 border-yellow-500 shadow-xl rounded-2xl p-10 w-full max-w-xl text-center">
        <div className="flex items-center justify-center mb-4">
          <GiBilledCap className="text-yellow-400 text-5xl mr-3" />
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-widest font-mono">
            Welcome Admin
          </h1>
        </div>
        <p className="text-gray-300 text-lg mb-6">Aquí puedes manejar todas tus <span className="text-yellow-400 font-semibold">gorras</span>.</p>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
            <MdDashboard className="text-xl" />
            Dashboard
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
            <MdInbox className="text-xl" />
            Pedidos
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
            <MdAccountCircle className="text-xl" />
            Perfil
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
          >
            <MdLogout className="text-xl" />
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
