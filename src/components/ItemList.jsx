// IMPORTS 
// PropTypes.
import PropTypes from "prop-types";
// Link para la navegación.
import { Link } from "react-router-dom";
// Componentes de Bootstrap.
import { Row, Col, Card, Container } from "react-bootstrap";
// Función de formateo de precios.
import { formatPrice } from "../utils/formatters";

// ITEMLIST

/**
 * Componente de presentación que muestra una lista de productos en formato grid.
 * 
 * Objetivo:
 * - Renderizar la lista de productos en un formato de grid responsive.
 * - Mostrar la información detallada de cada producto en tarjetas.
 * - Proporcionar navegación a la vista detallada del producto.
 * 
 * Props:
 * @param {Object[]} items - Array de productos a mostrar.
 * @param {string} items[].id - Identificador único del producto.
 * @param {string} items[].name - Nombre del producto.
 * @param {string} items[].description - Descripción del producto.
 * @param {number} items[].price - Precio del producto.
 * @param {string} items[].category - Categoría del producto.
 * @param {string[]} items[].images - Array de URLs de imágenes del producto.
 */

const ItemList = ({ items }) => {
  return (

    <div className="item-list bg-light">
      
      <Container className="py-4">

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {/* Iteramos sobre cada producto para crear su tarjeta. */}
          {items.map(product => (
            // Columna para cada producto con key única para React.
            <Col key={product.id}>
              {/* Tarjeta de producto con altura 100% y sombra suave. */}
              <Card className="h-100 shadow-sm border">
                <Card.Img
                  variant="top"
                  src={product.images?.[0] || "https://publicdomainvectors.org/photos/mono-gnome-question.png"}
                  alt={product.name}
                  className="p-3"
                  style={{
                    height: "200px",
                    objectFit: "contain"
                  }}
                />
                {/* Cuerpo de la tarjeta con layout flexible para posicionar elementos. */}
                <Card.Body className="d-flex flex-column">

                  <Card.Title>{product.name}</Card.Title>

                  <Card.Text className="text-muted small">{product.description}</Card.Text>

                  <Card.Text className="text-muted">
                    <small>Categoría: {product.category}</small>
                  </Card.Text>

                  <Card.Text className="h5 text-success mt-auto mb-3">
                    {formatPrice(product.price)}
                  </Card.Text>

                  <Link to={`/item/${product.id}`} className="btn btn-success">
                    Ver Detalles
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

// Validación de props.

ItemList.propTypes = {

  items: PropTypes.arrayOf(

    PropTypes.shape({
      id: PropTypes.string.isRequired,      // ID único requerido.
      name: PropTypes.string.isRequired,    // Nombre requerido.
      description: PropTypes.string,        // Descripción opcional.
      price: PropTypes.number.isRequired,   // Precio requerido.
      category: PropTypes.string.isRequired,// Categoría requerida.
      images: PropTypes.arrayOf(PropTypes.string) // Array de URLs de imágenes .opcional
    })
  ).isRequired
};

// Exportamos el componente ItemList.
export default ItemList; 