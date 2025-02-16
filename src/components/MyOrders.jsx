//IMPORTS
// Hooks. 
import { useState } from 'react';
// Componentes Bootstrap.
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';
// Firebase.
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../main';
// Formateo precios.
import { formatPrice } from '../utils/formatters';
// Íconos.
import { FaSearch } from 'react-icons/fa';


// MYORDERS

/**
 * Objetivo:
 * - Buscar y mostrar detalles de una orden específica.
 * 
 */ 

// Componente principal.

const MyOrders = () => {
  // Búsqueda y resultados.
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Búsqueda de la orden.
  const searchOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Por favor, ingresa un ID de orden');
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const orderRef = doc(db, 'orders', orderId.trim());
      const orderSnap = await getDoc(orderRef);

      if (!orderSnap.exists()) {
        setError('No se encontró ninguna orden con ese ID');
        return;
      }

      // Datos de la orden sin información personal.
      const orderData = orderSnap.data();
      setOrder({
        id: orderSnap.id,
        items: orderData.items,
        total: orderData.total,
        date: orderData.date?.toDate?.() || new Date(),
        status: orderData.status
      });
    } catch (error) {
      console.error('Error al buscar la orden:', error);
      setError('Error al buscar la orden. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado.
  return (
    <Container className="py-5 mt-4">
      <h2 className="mb-4">Mis Pedidos</h2>
      
      {/* Formulario búsqueda */}
      <Form onSubmit={searchOrder} className="mb-4">
        <div className="d-flex gap-2">
          <Form.Group className="flex-grow-1">
            <Form.Control
              type="text"
              placeholder="Ingresa el ID de tu pedido"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </Form.Group>
          <Button 
            variant="success" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Buscando...' : <><FaSearch className="me-2" />Buscar</>}
          </Button>
        </div>
      </Form>

      {/* Error */}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {/* Detalles de la orden */}
      {order && (
        <div>
          <Alert variant="success" className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Orden ID:</strong> {order.id}
            </div>
            <div>
              <span className={`badge bg-${order.status === 'generada' ? 'success' : 'warning'}`}>
                {order.status || 'generada'}
              </span>
            </div>
          </Alert>
          {/* Tabla productos */}
          <Table responsive hover className="mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <strong>{item.title}</strong>
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>{formatPrice(order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</strong>
                </td>
              </tr>
            </tfoot>
          </Table>

          <div className="text-muted mt-2">
            Fecha: {order.date.toLocaleDateString()} {order.date.toLocaleTimeString()}
          </div>
        </div>
      )}
    </Container>
  );
};

// Exportamos el componente MyOrders.
export default MyOrders; 