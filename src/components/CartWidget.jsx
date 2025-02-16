//IMPORTS
// Link de react-router-dom para la navegación.
import { Link } from 'react-router-dom';
// Hook useCart del contexto del carrito.
import { useCart } from '../context/CartContext';

//CARTWIDGET
/*
 * Objetivo:
 * - Mostrar ícono del carrito con cantidad de items.
 * - Navegar a la página del carrito.
 */

const CartWidget = () => {
  // Función getTotalQuantity del contexto del carrito.
  const { getTotalQuantity } = useCart();
  // Cantidad total de items en el carrito.
  const quantity = getTotalQuantity();

  return (
    // Link widget para navegar a la página del carrito.
    <Link to="/cart" className="text-decoration-none text-dark">
      {/* Ícono carrito con posicionamiento relativo. */}
      <div className="position-relative d-inline-block">
        {/* Ícono carrito usando Bootstrap Icons. */}
        <i className="bi bi-cart3 fs-3"></i>
        {/* Indicador con la cantidad de items -visible si hay items en el carrito. */}
        {quantity > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {quantity}
          </span>
        )}
      </div>
    </Link>
  );
};

// Export componente CartWidget
export default CartWidget;
