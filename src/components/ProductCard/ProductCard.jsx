import React, { memo } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/context";
import { formatPrice } from '../../utils/formatters';

const ProductsCard = memo(({ products }) => {
  const { addToCart } = useCart();

  // Animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    available: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity
      }
    },
    soldout: {
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 1,
        repeat: Infinity
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 5px 15px rgba(246, 59, 59, 0.4)"
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: index * 0.1 }}
          className="relative bg-neutral-900 rounded-xl overflow-hidden border-2 border-red-900 group"
        >
          {/* Badge de disponibilidad con animación */}
          <motion.div
            variants={badgeVariants}
            animate={product.disponible !== false ? "available" : "soldout"}
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold z-10 ${
              product.disponible !== false 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
            }`}
          >
            {product.disponible !== false ? 'STOCK' : 'SOLD OUT'}
          </motion.div>

          {/* Overlay para productos agotados */}
          {product.disponible === false && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center"
            >
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                AGOTADO
              </span>
            </motion.div>
          )}

          {/* Imagen con efecto urbano */}
          <div className="relative h-60 overflow-hidden">
            <motion.img
              src={product.imagen || '/placeholder.png'}
              alt={product.nombre}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Contenido */}
          <div className="p-4">
            <h3 className="font-bold text-lg text-white truncate">{product.nombre}</h3>
            
            <div className="flex justify-between items-center my-2">
              <p className="text-xl font-bold text-white">{formatPrice(product.precio)}</p>
              
              {product.categoria && (
                <span className="inline-block bg-red-900 text-white text-xs px-2 py-1 rounded-full">
                  {product.categoria.toUpperCase()}
                </span>
              )}
            </div>

            {product.precio_mayorista && product.precio_mayorista < product.precio && (
              <p className="text-green-400 text-sm font-bold mb-2">Precio mayorista: {formatPrice(product.precio_mayorista)}</p>
            )}

            {/* Botón con efecto urbano */}
            <motion.button 
              onClick={() => product.disponible !== false && addToCart(product)}
              disabled={product.disponible === false}
              variants={buttonVariants}
              whileHover={product.disponible !== false ? "hover" : ""}
              whileTap={product.disponible !== false ? "tap" : ""}
              className={`cursor-pointer w-full mt-3 py-3 rounded-lg font-bold uppercase text-sm tracking-wider ${
                product.disponible !== false
                  ? 'bg-red-900 text-white hover:bg-red-600'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              }`}
            >
              {product.disponible !== false ? (
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  AÑADIR
                </span>
              ) : 'AGOTADO'}
            </motion.button>
          </div>

          {/* Efecto de borde al hacer hover */}
          <motion.div 
            className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </motion.div>
      ))}
    </div>
  );
});

ProductsCard.displayName = 'ProductsCard';
export default ProductsCard;