import React from 'react';
import { useCart } from '../context/context';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters'; // Importa la función de formateo

const CarritoPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice 
  } = useCart();

  // Calcular subtotal y total usando precio mayorista si hay más de 4 gorras
  const usaMayorista = totalItems >= 4;
  const subtotal = cart.reduce((acc, item) => {
    const precioUnitario = usaMayorista && item.precio_mayorista ? item.precio_mayorista : item.precio;
    return acc + precioUnitario * item.quantity;
  }, 0);
  const finalPrice = subtotal;

  // Función para enviar pedido por WhatsApp
  const sendWhatsAppOrder = () => {
    const productsText = cart.map(item => {
      const precioUnitario = usaMayorista && item.precio_mayorista ? item.precio_mayorista : item.precio;
      return `- ${item.nombre} (x${item.quantity}): $${formatPrice(precioUnitario * item.quantity)}`;
    }).join('%0A');
    
    const message = `¡Hola! Quiero realizar este pedido:%0A%0A` +
      `${productsText}%0A%0A` +
      `Total a pagar: $${formatPrice(finalPrice)}%0A%0A` +
      `¿Podrían confirmarme disponibilidad y forma de pago?`;
    
    const phoneNumber = '573023029945';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-neutral-800  w-full mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Tu Carrito de Compras</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-300 mb-4">Tu carrito está vacío</p>
          <Link 
            to="/gorras" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-zinc-800 rounded-lg shadow-md overflow-hidden mb-6">
            {cart.map((item) => {
              const precioUnitario = usaMayorista && item.precio_mayorista ? item.precio_mayorista : item.precio;
              return (
                <div key={item.id} className="p-4 border-b border-zinc-700 flex flex-col md:flex-row items-center">
                  <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    className="w-20 h-20 object-cover rounded mb-4 md:mb-0"
                  />
                  <div className="md:ml-4 flex-grow text-center md:text-left">
                    <h3 className="font-medium text-white">{item.nombre}</h3>
                    <p className="font-bold">
                      {usaMayorista && item.precio_mayorista && item.precio_mayorista < item.precio ? (
                        <>
                          <span className="text-red-400 line-through mr-2">${formatPrice(item.precio)}</span>
                          <span className="text-green-400">${formatPrice(item.precio_mayorista)} <span className="text-xs">(Mayorista)</span></span>
                        </>
                      ) : (
                        <span className="text-red-400">${formatPrice(item.precio)}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="cursor-pointer px-3 py-1 bg-zinc-700 text-white rounded-l hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-zinc-600 text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="cursor-pointer px-3 py-1 bg-zinc-700 text-white rounded-r hover:bg-green-600"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-600 rounded cursor-pointer ml-4 text-white hover:bg-red-900 px-2 py-2   transition-all ease-in-out duration-500 scale-110 font-bold text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-zinc-800 rounded-lg shadow-md p-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-white">Total:</span>
                <span className="text-white">${formatPrice(finalPrice)}</span>
              </div>
              {usaMayorista && (
                <p className="text-green-400 text-sm mt-2">
                  ¡Precio mayorista aplicado por llevar más de 4 gorras!
                </p>
              )}
            </div>
            
            <button 
              onClick={sendWhatsAppOrder}
              className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar pedido por WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarritoPage;