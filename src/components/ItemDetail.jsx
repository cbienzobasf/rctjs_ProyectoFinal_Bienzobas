// ITEMDETAIL

/**
 * Objetivo:
 * - Visualización producto individual.
 * - Carrusel de imágenes producto.
 * - Información detallada producto (nombre, precio, descripción).
 * - Cantidad a comprar.
 * - Lista de deseos.
 * - Validación de stock en tiempo real.
 * 
 * @param {Object} product - Objeto con la información completa del producto
 * @param {number} currentImageIndex - Índice de la imagen actual en el carrusel
 * @param {function} onImageChange - Función para cambiar la imagen actual
 */

// IMPORTS
// Tipos para las props del componente.
import PropTypes from "prop-types";
// Formateo precios en formato moneda.
import { formatPrice } from "../utils/formatters";
// Selección de cantidad de productos.
import ItemCount from "./ItemCount";
// Gestión del carrito de compras.
import { useCart } from "../context/CartContext";
// Gestión de la lista de deseos.
import { useWishlist } from "../context/WishlistContext";
// Componentes Bootstrap.
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
// Íconos.
import { FaHeart, FaRegHeart } from 'react-icons/fa';
// Hook navegación.
import { useNavigate } from "react-router-dom";


// COMPONENTE PRINCIPAL

const ItemDetail = ({ product, currentImageIndex, onImageChange }) => {
  const navigate = useNavigate();

  // hooks y estados.

  // Agregar productos al carrito.
  const { addItem } = useCart();
  // Gestión de la lista de deseos.
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Validación producto.
  if (!product) {
    return <div className="text-center my-5 text-danger">Producto no encontrado</div>;
  }

  // Eventos.
  /**
   * Estado del producto en la lista de deseos
   */

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Renderizado.
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col xs={11} className="px-4">
            {/* Tarjeta producto */}
            <Card className="border-success shadow-lg mx-auto" style={{ maxWidth: '1000px' }}>
              <Row className="g-0">
                {/* Columna izquierda: Carrusel de imágenes */}
                <Col lg={7}>
                  <div className="p-3">
                    {/* imágenes del producto */}
                    <div 
                      id={`carousel-${product.id}`} 
                      className="carousel slide" 
                      data-bs-ride="carousel"
                      style={{ height: '600px' }}
                    >
                      {/* Contenedor imágenes */}
                      <div className="carousel-inner h-100">
                        {/* Renderizado */}
                        {product.images && product.images.length > 0 ? (
                          // Mapeo imágenes
                          product.images.map((image, index) => (
                            <div 
                              key={index} 
                              className={`carousel-item h-100 ${index === currentImageIndex ? "active" : ""}`}
                            >
                              <div 
                                className="w-100 h-100"
                                style={{
                                  backgroundImage: `url(${image})`,
                                  backgroundSize: 'contain',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundColor: '#fff'
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          // Placeholder si no hay imágenes.
                          <div className="carousel-item active h-100">
                            <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                              <span className="text-muted">Imagen no disponible</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Controles del carrusel */}
                      {product.images && product.images.length > 1 && (
                        <>
                          {/* Botón anterior */}
                          <button
                            className="carousel-control-prev"
                            type="button"
                            onClick={() => onImageChange((prev) => (
                              prev === 0 ? product.images.length - 1 : prev - 1
                            ))}
                          >
                            <span 
                              className="carousel-control-prev-icon bg-success rounded-circle p-3" 
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Anterior</span>
                          </button>
                          {/* Botón siguiente */}
                          <button
                            className="carousel-control-next"
                            type="button"
                            onClick={() => onImageChange((prev) => (
                              prev === product.images.length - 1 ? 0 : prev + 1
                            ))}
                          >
                            <span 
                              className="carousel-control-next-icon bg-success rounded-circle p-3" 
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Siguiente</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Col>

                {/* Columna derecha: Información producto */}
                <Col lg={5}>
                  <Card.Body className="p-4">
                    {/* título, precio y botón */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <Card.Title as="h2" className="mb-2">{product.name}</Card.Title>
                        <Card.Subtitle className="mb-3 h2 text-success fw-bold">
                          {formatPrice(product.price)}
                        </Card.Subtitle>
                      </div>
                      <button 
                        onClick={() => navigate('/')} 
                        className="btn p-0 d-flex align-items-center justify-content-center"
                        style={{ 
                          width: "28px",
                          height: "28px",
                          backgroundColor: "white",
                          border: "2px solid #000",
                          borderRadius: "50%",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          color: "#000",
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out"
                        }}
                        title="Volver a la página principal"
                      >
                        <span aria-hidden="true" style={{ 
                          fontSize: "18px", 
                          fontWeight: "bold",
                          lineHeight: 1,
                          position: "relative",
                          top: "-1px"
                        }}>&times;</span>
                      </button>
                    </div>

                    {/* Descripción producto */}
                    <Card.Text>{product.description}</Card.Text>

                    {/* Cantidad y botones de acción */}
                    <div className="mt-4">
                      <div className="d-flex flex-column gap-3">
                        {/* Botón Agregar al Carrito */}
                        <div className="d-flex flex-column align-items-center">
                          <ItemCount
                            stock={product.stock}
                            initial={1}
                            onAdd={(selectedQuantity) => {
                              addItem(product, selectedQuantity);
                            }}
                          />
                        </div>
                        
                        {/* Botón Wishlist */}
                        <div className="d-flex flex-column align-items-center">
                          <Button 
                            variant="outline-success"
                            onClick={toggleWishlist}
                            className="d-flex align-items-center justify-content-center gap-2"
                            style={{ 
                              width: '222px',
                              height: '38px'
                            }}
                          >
                            {isInWishlist(product.id) ? (
                              <>
                                <FaHeart size={18} />
                                Quitar de Wishlist
                              </>
                            ) : (
                              <>
                                <FaRegHeart size={18} />
                                Agregar a Wishlist
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Stock */}
                        <small className="text-center text-muted">
                          Stock disponible: {product.stock}
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Props.
ItemDetail.propTypes = {
  // Producto
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,           // ID producto.
    name: PropTypes.string.isRequired,         // Nombre.
    description: PropTypes.string.isRequired,  // Descripción.
    category: PropTypes.string.isRequired,     // Categoría.
    price: PropTypes.number.isRequired,        // Precio.
    stock: PropTypes.number.isRequired,        // Cantidad.
    images: PropTypes.arrayOf(PropTypes.string) // Array de URLs de imágenes.
  }).isRequired,
  currentImageIndex: PropTypes.number.isRequired,  // Índice carrusel.
  onImageChange: PropTypes.func.isRequired,        // Función para cambiar imagen.
};

// Exportamos el componente ItemDetail.
export default ItemDetail;
