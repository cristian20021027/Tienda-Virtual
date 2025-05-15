import React, { useState } from "react";
import { motion } from "framer-motion";
import { GiBilledCap } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // ajusta la ruta si es necesario

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Credenciales incorrectas: " + error.message);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full rounded-xl shadow-lg p-8 border border-red-600"
      >
        <div className="text-4xl flex justify-center items-center gap-2 font-bold uppercase p-9">
          <GiBilledCap className="text-white" />
          <p className="text-white">Street</p>
          <p className="text-red-600">Cap</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-500 text-white bg-transparent"
              placeholder="ejemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-500 text-white bg-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition-colors transition-all duration-500"
          >
            Iniciar sesión
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
