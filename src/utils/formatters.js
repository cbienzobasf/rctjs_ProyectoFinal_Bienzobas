// Función para formatear precios en pesos chilenos.
export const formatPrice = (price) => {
  return `$${new Intl.NumberFormat('es-CL', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)}`;
}; 