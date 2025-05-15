import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AgregarGorra = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [disponible, setDisponible] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
  
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (!user || authError) {
        throw new Error("Debes iniciar sesión para agregar gorras");
      }
  
      if (!imagen || !imagen.type.includes("image")) {
        throw new Error("Solo se permiten imágenes");
      }
  
      const nombreArchivo = `${Date.now()}_${imagen.name}`;
      const { error: uploadError } = await supabase.storage
        .from("gorras")
        .upload(nombreArchivo, imagen);
  
      if (uploadError) throw uploadError;
  
      const { data: { publicUrl } } = supabase.storage
        .from("gorras")
        .getPublicUrl(nombreArchivo);
  
      const { error: insertError } = await supabase
        .from("gorras")
        .insert([{
          nombre,
          precio: parseFloat(precio),
          imagen: publicUrl,
          categoria,
          disponible,
          user_id: user.id,
        }]);
  
      if (insertError) throw insertError;
  
      setMensaje("✅ Gorra agregada correctamente");
      setTimeout(() => navigate('/admin/'), 1500);
  
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Agregar Nueva Gorra</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre de la Gorra:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            min="0"
            step="0.01"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Categoría:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="plana">Plana</option>
            <option value="normal">Normal</option>
            <option value="exclusiva">Exclusiva</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-3 text-gray-700">Disponible:</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {disponible ? 'Sí' : 'No'}
            </span>
          </label>
        </div>

        <div>
          <label className="block text-gray-700">Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            cargando ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {cargando ? "Procesando..." : "Agregar Gorra"}
        </button>

        {mensaje && (
          <p className={`mt-4 text-center text-sm ${
            mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
};

export default AgregarGorra;