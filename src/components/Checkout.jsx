
//CHECKOUT
 
/**
 * Objetivo:
 * - Muestra formulario de datos.
 * - Valida inputs.
 * - Verifica stock.
 * - Crea orden.
 * - Actualiza inventario.
 * - Muestra confirmación.
 * 
 * @requires useState - Gestión de estados del formulario y proceso.
 * @requires useNavigate - Redirección post-compra.
 * @requires useCart - Acceso contexto del carrito.
 * @requires useAuth - Acceso contexto autenticación.
 * @requires firebase/firestore - Base de datos órdenes.
 */

//IMPORTS
// Hook para manejo de estados locales.
import { useState } from 'react';
// Hook para navegación.
import { useNavigate } from 'react-router-dom';
// Contexts para carrito y autenticación.
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// Componentes Bootstrap.
import { Container, Form, Button, Alert } from 'react-bootstrap';
// Verificación y actualización de stock.
import { checkStock, updateStock } from '../services/stockService';
// Configuración Firebase.
import { db } from '../main';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// COMPONENTE PRINCIPAL
const Checkout = () => {
    // HOOKS Y ESTADOS
    // Navegación entre páginas
    const navigate = useNavigate();
    // Funcionalidades del carrito.
    const { cart, clear } = useCart();
    // Información del usuario autenticado si existe
    const { user } = useAuth();
    
    // Control checkout.    
    const [loading, setLoading] = useState(false);        // Estado de carga.
    const [error, setError] = useState(null);            // Manejo de errores.
    const [orderNumber, setOrderNumber] = useState(null); // Almacenaje ID de la orden creada.

    // Formulario datos comprador.
    const [formData, setFormData] = useState({
        name: '',                    // Nombre del comprador.
        phone: '',                   // Teléfono de contacto.
        email: user?.email || '',    // Email (auto-completado si hay usuario).
        confirmEmail: user?.email || '' // Confirmación de email.
    });

    // Manejadores de eventos: Actualiza el estado del formulario.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,                 // Mantiene valores previos
            [name]: value           // Actualiza solo el campo modificado
        }));
    };

    // Validaciones: Valida todos los campos del formulario antes de procesar.
    const validateForm = () => {
        // Verifica que el nombre no esté vacío.
        if (!formData.name.trim()) throw new Error('El nombre es requerido');
        // Verifica que el teléfono no esté vacío.
        if (!formData.phone.trim()) throw new Error('El teléfono es requerido');
        // Verifica que el email no esté vacío
        if (!formData.email.trim()) throw new Error('El email es requerido');
        // Verifica que los emails coincidan
        if (formData.email !== formData.confirmEmail) throw new Error('Los emails no coinciden');
        // Verifica que haya productos en el carrito
        if (cart.length === 0) throw new Error('El carrito está vacío');
    };

    // Verifica el stock disponible para cada producto del carrito.
    const validateStock = async () => {
        for (const item of cart) {
            // Consulta el stock actual para cada producto.
            const hasStock = await checkStock(item.id, item.quantity);
            // Si no hay stock suficiente, lanza error.
            if (!hasStock) throw new Error(`Stock insuficiente para ${item.name}`);
        }
    };

    // Actualización de stock.
    // Actualiza el stock de todos los productos comprados.
    const updateStockLevels = async () => {
        for (const item of cart) {
            // Reduce el stock según la cantidad comprada
            await updateStock(item.id, item.quantity);
        }
    };

    // Procesamiento de orden.
    // Envío del formulario y creación de la orden.
    const handleSubmit = async (e) => {
        e.preventDefault();                  
        setLoading(true);                   
        setError(null);                     

        try {
            // Validaciones inicial.
            validateForm(); // Validación campos formulario.
            await validateStock(); // Verificación stock disponible.

            // Preparación datos de la orden.
            const orderData = {
                buyer: {
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    email: formData.email.trim()
                },
                items: cart.map(item => ({
                    id: item.id,
                    title: item.name || 'Producto sin título',
                    price: Number(item.price) || 0,
                    quantity: Number(item.quantity) || 0,
                    subtotal: (Number(item.price) || 0) * (Number(item.quantity) || 0),
                    customizations: item.customizations || {}
                })),
                total: cart.reduce((sum, item) => 
                    sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0),
                date: serverTimestamp(),
                status: String('generada')
            };

            // Guardar orden en Firestore.
            const docRef = await addDoc(collection(db, 'orders'), {...orderData});
            
            // Actualizar stock de productos.
            await updateStockLevels();

            // Finalización exitosa.
            setOrderNumber(docRef.id);      
            clear();                    

        } catch (error) {
            // Errores.
            console.error('Error en checkout:', error);
            setError(error.message || 'Error al procesar la orden');
        } finally {
            setLoading(false);           
        }
    };

    //Renderizado de si hay número de orden, muestra la confirmación de compra
    if (orderNumber) {
        return (
            <Container className="py-5 mt-5 text-center">
                <Alert variant="success" className="mt-4">
                    <h4>¡Gracias por tu compra!</h4>
                    <p>Tu número de orden es: {orderNumber}</p>
                </Alert>
                <Button 
                    variant="success" 
                    onClick={() => navigate('/')}
                >
                    Volver a la tienda
                </Button>
            </Container>
        );
    }

    // Renderizado formulario de checkout.
    return (
        <Container className="py-5 mt-4">
            <h2>Checkout</h2>
            {user && (
                <Alert variant="info">
                    Comprando como: {user.email}
                </Alert>
            )}
            
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {/* Formulario de datos del comprador */}
            <Form onSubmit={handleSubmit}>
                {/* Nombre completo */}
                <Form.Group className="mb-3">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {/* Teléfono de contacto */}
                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        readOnly={!!user}
                    />
                </Form.Group>

                {/* Confirmación de Email (solo si no hay usuario autenticado) */}
                {!user && (
                    <Form.Group className="mb-3">
                        <Form.Label>Confirmar Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                )}

                {/* Botones */}
                <div className="d-flex justify-content-between">
                    
                    <Button 
                        variant="secondary" 
                        onClick={() => navigate('/cart')}
                    >
                        Volver al carrito
                    </Button>
                   
                    <Button 
                        type="submit" 
                        variant="success"
                        disabled={loading || cart.length === 0}
                    >
                        {loading ? 'Procesando...' : 'Finalizar Compra'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};
// Exportación componente Checkout.
export default Checkout; 