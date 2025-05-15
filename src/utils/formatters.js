export const formatPrice = (price) => {
  // Convertir a número por si acaso viene como string
  const number = Number(price);
  
  // Formatear con separadores de miles y decimales
  return new Intl.NumberFormat('es-ES', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};