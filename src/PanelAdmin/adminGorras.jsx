import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const AdminGorras = () => {
  const [gorras, setGorras] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    precio_mayorista: '',
    imagen: '',
    categoria: '',
    calificacion: 0,
    disponible: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGorras = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gorras')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setGorras(data || []);
      } catch (err) {
        console.error('Error al cargar gorras:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchGorras();

    const subscription = supabase
      .channel('gorras-changes')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT,DELETE,UPDATE',
          schema: 'public', 
          table: 'gorras' 
        },
        fetchGorras
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              (name === 'precio' || name === 'calificacion' ? Number(value) : value)
    }));
  };

  const handleEdit = (gorra) => {
    setEditando(gorra.id);
    setFormData({
      nombre: gorra.nombre,
      precio: gorra.precio,
      precio_mayorista: gorra.precio_mayorista || '',
      imagen: gorra.imagen,
      categoria: gorra.categoria || '',
      calificacion: gorra.calificacion || 0,
      disponible: gorra.disponible !== false
    });
  };

  const handleSave = async (id) => {
    try {
      setLoading(true);
      setError('');

      if (!formData.nombre || !formData.precio) {
        throw new Error('Nombre y precio son requeridos');
      }

      const { data, error } = await supabase
        .from('gorras')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select('*');

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('No se recibieron datos actualizados');
      }

      setGorras(gorras.map(g => g.id === id ? data[0] : g));
      setEditando(null);
    } catch (err) {
      console.error('Error al actualizar:', err);
      setError(`Error al guardar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta gorra?')) return;

    try {
      setLoading(true);
      setError('');

      const { error } = await supabase
        .from('gorras')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error al eliminar:', err);
      setError(`Error al eliminar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && gorras.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Administrar Gorras</h2>
        <button
          onClick={() => navigate('/admin/agregar-gorra')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Agregar Nueva
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gorras.map((gorra) => (
          <div key={gorra.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:border-amber-400 transition-all">
            {editando === gorra.id ? (
              <div className="p-4 space-y-3">
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Nombre"
                  required
                />
                <input
                  name="precio"
                  type="number"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Precio"
                  required
                  min="0"
                  step="0.01"
                />
                <input
                  name="precio_mayorista"
                  type="number"
                  value={formData.precio_mayorista}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Precio Mayorista"
                  required
                  min="0"
                  step="0.01"
                />
                <input
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  placeholder="URL de imagen"
                />
                <input
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Categoría"
                />
                <div className="flex items-center">
                  <label className="mr-3 dark:text-white">Disponible:</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="disponible"
                      checked={formData.disponible}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    <span className="ml-3 text-sm font-medium dark:text-white">
                      {formData.disponible ? 'Sí' : 'No'}
                    </span>
                  </label>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setEditando(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSave(gorra.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 relative">
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold z-10 ${
                  gorra.disponible !== false
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {gorra.disponible !== false ? 'DISPONIBLE' : 'AGOTADO'}
                </div>
                
                <img 
                  src={gorra.imagen || '/placeholder.png'} 
                  alt={gorra.nombre}
                  className="w-full h-48 object-cover rounded mb-3"
                  onError={(e) => e.target.src = '/placeholder.png'}
                />
                <h3 className="text-lg font-bold dark:text-white">{gorra.nombre}</h3>
                <p className="text-gray-700 dark:text-gray-300">${gorra.precio}</p>
                {gorra.categoria && (
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded mt-1">
                    {gorra.categoria}
                  </span>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(gorra)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(gorra.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGorras;