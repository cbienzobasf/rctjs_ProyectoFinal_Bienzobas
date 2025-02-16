// NAVBAR

/**
 * Objetivo:
 * - Barra de navegación principal.
 * - Logo y marca de la tienda.
 * - Menú de categorías de productos.
 * - Acceso a la lista de deseos.
 * - Sistema de autenticación
 * - Carrito de compras
 * 
 */

// IMPORTS 
// Link para navegación.
import { Link } from 'react-router-dom';
// Carrito.
import CartWidget from './CartWidget';
// Autenticación.
import Login from './Login';
// Bootstrap.
import { Nav, Navbar, Container, Button, Badge } from 'react-bootstrap';
// Ícono corazón lista de deseos.
import { FaHeart, FaClipboardList } from 'react-icons/fa';
// lista de deseos.
import { useWishlist } from '../context/WishlistContext';
// Firebase
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../main';
// React
import { useState, useEffect } from 'react';

// Componente principal.
const NavBar = () => {
  // Estados
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // Lista de deseos.
  const { wishlist } = useWishlist();

  // Efecto para cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Renderizado.
  return (
    // Barra de navegación fija en la parte superior.
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        {/* Logo y nombre de la tienda */}
        <Navbar.Brand as={Link} to="/">MiMatri</Navbar.Brand>
        {/* Botón hamburguesa */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Contenido colapsable navbar */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menú principal */}
          <Nav className="me-auto">
            {/* Generación dinámica enlaces categorías */}
            {loading ? (
              <Nav.Item>Cargando categorías...</Nav.Item>
            ) : (
              categories.map(cat => (
                <Nav.Link 
                  key={cat.id} 
                  as={Link} 
                  to={`/category/${cat.key}`}
                >
                  {cat.name}
                </Nav.Link>
              ))
            )}
          </Nav>
          {/* Menú secundario (wishlist, login, carrito) */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {/* Enlace a la lista de deseos */}
            <Link 
              to="/wishlist" 
              className="text-decoration-none"
            >
              <Button 
                variant="outline-secondary" 
                className="d-flex align-items-center gap-2"
              >
                <FaHeart />
                Wishlist
                {/* Contador de items en wishlist */}
                {wishlist.length > 0 && (
                  <Badge 
                    bg="danger" 
                    pill
                    className="ms-1"
                  >
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>
            {/* Mis Pedidos */}
            <Link 
              to="/my-orders" 
              className="text-decoration-none"
            >
              <Button 
                variant="outline-secondary" 
                className="d-flex align-items-center gap-2"
              >
                <FaClipboardList />
                Mis Pedidos
              </Button>
            </Link>
            {/* Autenticación */}
            <Login />
            {/* Carrito */}
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Exportamos el componente NavBar.
export default NavBar;
