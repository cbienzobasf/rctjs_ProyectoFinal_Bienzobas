// IMPORTS
// Hooks.
import { useState, useEffect } from "react";
// Navegación.
import { useParams } from "react-router-dom";
// Firebase.
import { collection, getDocs } from "firebase/firestore";
import { db } from '../main';
// PropTypes.
import PropTypes from "prop-types";
import ItemList from "./ItemList";

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
  // ID categoría.
  const { id: categoryId } = useParams();

  // Normalizar texto.
  const normalizeText = (text) => {
    return text
      .normalize("NFD") // Descompone caracteres con acentos.
      .replace(/[\u0300-\u036f]/g, "") // Elimina acentos.
      .toLowerCase(); // Convierte a minúsculas.
  };

  // Efecto.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Referencia colección.
        const productsRef = collection(db, "items");
        // Snapshot colección.
        const querySnapshot = await getDocs(productsRef);
        // Datos productos.
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filtro productos.
        const filteredProducts = categoryId
          ? productsData.filter(product => normalizeText(product.category) === normalizeText(categoryId))
          : productsData;

        setItems(filteredProducts);
      } catch (error) {
        console.error("❌ Error obteniendo productos:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return <ItemList items={items} />;
};

// Props.
ItemListContainer.propTypes = {
  greeting: PropTypes.string,
};

// Exportamos el componente ItemListContainer.
export default ItemListContainer;
