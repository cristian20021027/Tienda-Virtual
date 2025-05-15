import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supabase from '../supabaseClient';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar productos
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('gorras')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar carrito desde localStorage
  const loadCart = useCallback(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error parsing cart:', err);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Configurar suscripción a cambios en tiempo real
  useEffect(() => {
    // Carga inicial
    fetchProducts();
    loadCart();

    // Suscripción a cambios
    const subscription = supabase
      .channel('gorras-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'gorras',
          filter: 'id=*'
        },
        (payload) => {
          console.log('Cambio detectado en Supabase:', payload);
          fetchProducts(); // Actualizar lista de productos
          
          // Si se eliminó un producto, quitarlo del carrito
          if (payload.eventType === 'DELETE') {
            setCart(currentCart => 
              currentCart.filter(item => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchProducts, loadCart]);

  // Persistir carrito en localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // Añadir al carrito
  const addToCart = useCallback((product) => {
    setCart(currentCart => {
      const existingProduct = currentCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }, []);

  // Eliminar del carrito
  const removeFromCart = useCallback((productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  }, []);

  // Actualizar cantidad
  const updateQuantity = useCallback((productId, newQuantity) => {
    setCart(currentCart => {
      if (newQuantity <= 0) {
        return currentCart.filter(item => item.id !== productId);
      }
      return currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  }, []);

  // Vaciar carrito
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calcular totales
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  
  // Aplicar descuento del 10% si hay 3 o más productos
  const discount = totalItems >= 3 ? subtotal * 0.1 : 0;
  const totalPrice = subtotal - discount;

  // Valor del contexto
  const contextValue = {
    products,
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    discount,
    totalPrice,
    refreshProducts: fetchProducts
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};