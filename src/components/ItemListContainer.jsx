// IMPORTS
// Hooks.
import { useState, useEffect } from "react";
// Navegación.
import { useParams, useNavigate } from "react-router-dom";
// Firebase.
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../main';
// PropTypes.
import PropTypes from "prop-types";
import ItemList from "./ItemList";
// Bootstrap
import { Alert, Container } from 'react-bootstrap';

// ITEMLISTCONTAINER

/**
 * Objetivo:
 * - Obtener y gestionar productos de una categoría específica.
 * - Manejar la lógica de obtención y filtrado de datos.
 */ 

// Componente principal.
const ItemListContainer = () => {
  // Estados.
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);
  
  // Hooks
  const { id: categoryId } = useParams();
  const navigate = useNavigate();

  // Efecto para verificar si la categoría existe
  useEffect(() => {
    const validateCategory = async () => {
      if (categoryId) {
        try {
          const categoriesRef = collection(db, "categories");
          const querySnapshot = await getDocs(categoriesRef);
          const categories = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          const category = categories.find(cat => cat.key === categoryId);
          
          if (!category) {
            setError("Categoría no encontrada");
            return;
          }
          
          setCategoryInfo(category);
        } catch (error) {
          console.error("Error validando categoría:", error);
          setError("Error al validar la categoría");
        }
      }
    };
    
    validateCategory();
  }, [categoryId]);

  // Efecto para cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Referencia colección.
        const productsRef = collection(db, "items");
        let q;
        
        if (categoryId) {
          // Si hay categoría, filtramos por ella
          q = query(productsRef, where("category", "==", categoryId));
        } else {
          // Si no hay categoría, traemos todos los productos
          q = productsRef;
        }
        
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(productsData);
      } catch (error) {
        console.error("❌ Error obteniendo productos:", error);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    if (!categoryId || (categoryId && categoryInfo)) {
      fetchProducts();
    }
  }, [categoryId, categoryInfo]);

  // Si hay error, mostramos mensaje
  if (error) {
    return (
      <Container className="py-3 mt-3">
        <Alert variant="danger">
          {error}
          <div className="mt-3">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Si está cargando, mostramos mensaje
  if (loading) {
    return (
      <Container className="py-3 mt-3 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  // Renderizado principal
  return (
    <Container className="py-3 mt-3">
      <ItemList items={items} />
    </Container>
  );
};

// Props.
ItemListContainer.propTypes = {
  greeting: PropTypes.string,
};

// Exportamos el componente ItemListContainer.
export default ItemListContainer;
