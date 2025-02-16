//IMPORTS
//Link navegación rutas React Router.
import { Link } from 'react-router-dom';
// Hook acceso contexto del carrito y sus funciones.
import { useCart } from '../context/CartContext';
// Formateo precios a moneda.
import { formatPrice } from '../utils/formatters';
// Hook contexto autenticación.
import { useAuth } from '../context/AuthContext';
// Componentes Bootstrap.
import { Button, Container, Table, Alert } from 'react-bootstrap';
//Íconos de FontAwesome.
import { FaTrash, FaImage, FaPlus, FaMinus } from 'react-icons/fa';


// CART - GESTIÓN DEL CARRITO DE COMPRAS.
/*
 * Objetivo:
 * - Mostrar productos agregados al carrito.
 * - Eliminar productos individuales.
 * - Totales.
 * - Navegar al checkout.
 */

const Cart = () => {
  // Extracción funciones y contexto del carrito.
  const { cart, removeItem, clear, getTotalPrice, updateItemQuantity } = useCart();
  // Información del usuario autenticado.
  const { user } = useAuth();

  // Rederización imagen del producto.
  const renderProductImage = (item) => {
    // Obtención primera imagen del array de imagen.
    const productImage = item.images && item.images.length > 0 ? item.images[0] : item.image;
    
    // Estilos imagen.
    if (productImage) {
      return (
        <img 
          src={productImage} 
          alt={item.title}
          className="rounded me-2"
          style={{
            width: '50px',         
            height: '50px',       
            objectFit: 'cover'     
          }}
        />
      );
    }
    // Si no hay imagen, mostramos un placeholder.
    return (
      <div className="d-flex align-items-center justify-content-center rounded border border-dashed bg-light me-2"
           style={{
             width: '50px',
             height: '50px'
           }}>
        <FaImage className="text-secondary" />
      </div>
    );
  };

  // Renderizado condicional para carrito vacío.
  if (cart.length === 0) {
    return (
      <Container className="py-5 mt-5 text-center">
        <Alert variant="info" className="mt-4">
          <h4>Tu carrito está vacío</h4>
          <div className="mt-3">
            <Link to="/" className="btn btn-primary">
              Volver a la tienda
            </Link>
          </div>
        </Alert>
      </Container>
    );
  }

  // Calculamos total de la compra.
  const total = getTotalPrice();

  // Renderizado carrito con productos.
  return (
    <Container className="py-5 mt-4">
      <h2>Tu Carrito</h2>
      {/* Muestra información del usuario si está autenticado. */}
      {user && (
        <Alert variant="info" className="mb-3">
          Comprando como: {user.email}
        </Alert>
      )}
      {/* Tabla de productos en el carrito. */}
      <Table responsive hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Iteramos sobre cada producto en el carrito. */}
          {cart.map(item => (
            <tr key={item.id}>
              {/* Imagen y detalles del producto. */}
              <td>
                <div className="d-flex align-items-center">
                  {renderProductImage(item)}
                  <div>
                    <strong>{item.title || item.name}</strong>
                    <p className="text-muted mb-0">{item.description}</p>
                  </div>
                </div>
              </td>
              {/* Precio unitario. */}
              <td>{formatPrice(item.price)}</td>
              {/* Cantidad seleccionada y controles. */}
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button 
                    variant={item.quantity <= 1 ? "outline-success" : "success"}
                    size="sm"
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button 
                    variant={item.quantity >= item.stock ? "outline-success" : "success"}
                    size="sm"
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </td>
              {/* Subtotal del producto (precio × cantidad). */}
              <td>{formatPrice(item.price * item.quantity)}</td>
              {/* Botón para eliminar el producto. */}
              <td>
                <Button 
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  title="Eliminar del carrito"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* Total carrito. */}
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end">
              <strong>Total:</strong>
            </td>
            <td>
              <strong>{formatPrice(total)}</strong>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
      {/* Botones de acción. */}
      <div className="d-flex justify-content-between mt-3">
        {/* Botón para vaciar todo el carrito */}
        <Button variant="outline-danger" onClick={clear}>
          Vaciar Carrito
        </Button>
        <div className="d-flex gap-2">
          {/* Botón para seguir comprando. */}
          <Link to="/" className="btn btn-outline-primary">
            Seguir comprando
          </Link>
          {/* Botón para proceder al checkout. */}
          <Link to="/checkout" className="btn btn-success">
            Finalizar Compra
          </Link>
        </div>
      </div>
    </Container>
  );
};

// Export componente Cart.
export default Cart; 