// WISHLIST

/**
 * Objetivo:
 * - Muestra los productos guardados por el usuario.
 * - Permite eliminar productos de la lista.
 * - Permite mover productos al carrito.
 * - Muestra información detallada de cada producto.
 * - Mueve un producto de la lista de deseos al carrito.
 * @param {Object} product - Producto a mover al carrito.
 * - Renderiza la imagen del producto o un placeholder.
 * @param {Object} product - Producto del cual mostrar la imagen.
 * @returns {JSX.Element} Elemento de imagen o placeholder.
 */

// IMPORTS
// Lista de deseos.
import { useWishlist } from '../context/WishlistContext';
// Carrito.
import { useCart } from '../context/CartContext';
// Componentes Bootstrap.
import { Container, Table, Button, Alert } from 'react-bootstrap';
// Íconos acciones.
import { FaTrash, FaCartPlus, FaImage } from 'react-icons/fa';
// Navegación
import { Link } from 'react-router-dom';
// Formateo precios.
import { formatPrice } from '../utils/formatters';

// COMPONENTE PRINCIPAL

const Wishlist = () => {
    // Contexto lista de deseos.
    const { wishlist, removeFromWishlist } = useWishlist();
    // Función agregar al carrito.
    const { addItem } = useCart();


    const handleAddToCart = (product) => {
        addItem(product, 1);              // Agregamos al carrito (desde 1).
        removeFromWishlist(product.id);   // Eliminamos de la lista de deseos.
    };

    const renderProductImage = (product) => {
        // Imagen del array.
        const productImage = product.images && product.images.length > 0 ? product.images[0] : product.image;
        
        // Estilos.
        if (productImage) {
            return (
                <img 
                    src={productImage} 
                    alt={product.title}
                    style={{ 
                        width: '50px',          // Ancho fijo
                        height: '50px',         // Alto fijo
                        objectFit: 'cover',     // Mantener proporción
                        marginRight: '10px',    // Espaciado derecho
                        borderRadius: '4px'     // Bordes redondeados
                    }}
                />
            );
        }

        // Si no hay imagen, mostramos un placeholder.
        return (
            <div 
                style={{ 
                    width: '50px',
                    height: '50px',
                    marginRight: '10px',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #dee2e6'
                }}
            >
                <FaImage style={{ color: '#adb5bd' }} />
            </div>
        );
    };

    // Renderizado condicional.

    // Mensaje y botón para ir a la tienda.
    if (wishlist.length === 0) {
        return (
            <Container className="py-5 mt-5 text-center">
                <Alert variant="info" className="mt-4">
                    <h4>No hay productos en tu lista de deseos</h4>
                    <div className="mt-3">
                        <Link to="/" className="btn btn-primary">
                            Ir a la tienda
                        </Link>
                    </div>
                </Alert>
            </Container>
        );
    }

    // Renderizado principal.
    return (
        <Container className="py-5 mt-4">
            <h2>Mi Lista de Deseos</h2>
            {/* Tabla de productos guardados */}
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iteración productos en la lista. */}
                    {wishlist.map(product => (
                        <tr key={product.id}>
                            {/* Imagen y detalles producto. */}
                            <td>
                                <div className="d-flex align-items-center">
                                    {renderProductImage(product)}
                                    <div>
                                        <strong>{product.title}</strong>
                                        <p className="text-muted mb-0">{product.description}</p>
                                    </div>
                                </div>
                            </td>
                            {/* Precio */}
                            <td>{formatPrice(product.price)}</td>
                            {/* Categoría */}
                            <td>
                                <span className="badge bg-secondary">
                                    {product.category}
                                </span>
                            </td>
                            {/* Botones de acción */}
                            <td>
                                <div className="d-flex gap-2">
                                    {/* Botón eliminar lista */}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromWishlist(product.id)}
                                        title="Eliminar de la lista de deseos"
                                    >
                                        <FaTrash />
                                    </Button>
                                    {/* Botón agregar al carrito */}
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleAddToCart(product)}
                                        title="Agregar al carrito"
                                    >
                                        <FaCartPlus />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Botones de navegación */}
            <div className="d-flex justify-content-between mt-3">
                {/* Botón para seguir comprando */}
                <Link to="/" className="btn btn-outline-primary">
                    Seguir comprando
                </Link>
                {/* Botón para ir al carrito */}
                <Link to="/cart" className="btn btn-success">
                    Ir al carrito
                </Link>
            </div>
        </Container>
    );
};

// Exportamos el componente Wishlist.
export default Wishlist; 