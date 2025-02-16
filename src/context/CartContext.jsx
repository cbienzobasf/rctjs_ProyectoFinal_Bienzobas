//CARTCONTEXT

/**
 * Objetivo:
 * - Gestionar el estado del carrito de compras.
 * - Persistir datos del carrito en localStorage.
 * - Manipular items.
 * - Calcular totales carrito.
 */

//IMPORTS

// Contexto y hooks .
import { createContext, useState, useContext, useEffect } from 'react';
// Tipos de Props.
import PropTypes from 'prop-types';

// COMPONENTE PRINCIPAL

// Contexto.
export const CartContext = createContext();

// Proveedor del Carrito.
export const CartProvider = ({ children }) => {
  // Carrito con persistencia en localStorage.
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persistir carrito en localStorage.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar item al carrito.
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart(prev => [...prev, { ...item, quantity }]);
    } else {
      setCart(prev => prev.map(cartItem =>              
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    }
  };

  // Eliminar item del carrito.
  const removeItem = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  // Vaciar carrito.
  const clear = () => {
    setCart([]);
  };

  // Validar si un item está en el carrito.
  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };

  // Obtener cantidad total de items.
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener precio total del carrito.
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Actualizar cantidad de un item.
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;                   
    setCart(prev => prev.map(item =>           
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Valores contexto.
  return (
    <CartContext.Provider value={{
      cart,                           // Estado del carrito.
      addItem,                        // Agregar item.
      removeItem,                     // Eliminar item.
      clear,                          // Vaciar carrito.
      isInCart,                       // Verificar item.
      getTotalQuantity,               // Cantidad total.
      getTotalPrice,                  // Precio total.
      updateItemQuantity             // Actualizar cantidad.
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Props.
CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Hook contexto.
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}; 