
// IMPORTS
// Hooks. 
import { useState, useEffect } from "react";
// Navegación.
import { useParams } from "react-router-dom";
// Firebase.
import { doc, getDoc } from "firebase/firestore";
import { db } from '../main';
// Componente.
import ItemDetail from "./ItemDetail";

// ITEMDETAILCONTAINER

/**
 * Objetivo:
 * - Obtener y mostrar detalles de un producto específico.
 * 
 */

// COMPONENTE PRINCIPAL
const ItemDetailContainer = () => {
  // Estados.
  // Almacenar información producto.
  const [product, setProduct] = useState(null);
  // Controlar índice de la imagen actual.
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // ID producto desde los parámetros de la URL.
  const { id } = useParams();
  // Estado de carga.
  const [loading, setLoading] = useState(true);

  // Cargar el producto.
  useEffect(() => {
    // Producto de Firestore.
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Referencia al documento.
        const productRef = doc(db, "items", id);
        // Snapshot del documento.
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          // Actualización estado.
          setProduct({ id: productSnap.id, ...productSnap.data() });
          // Reset índice carrusel.
          setCurrentImageIndex(0);
        } else {
          console.error("❌ No se encontró el producto en Firestore.");
        }
      } catch (error) {
        console.error("❌ Error obteniendo producto:", error);
      } finally {
        // Estado de carga.
        setLoading(false);
      }
    };

    // Función fetch.
    fetchProduct();
  }, [id]);

  // Renderizado condicional.
  // Indicador de carga mientras se obtiene producto.
  if (loading) {
    return <div className="text-center my-5">Cargando...</div>;
  }

  // Mensaje de error si no se encuentra producto.
  if (!product) {
    return <div className="text-center my-5 pt-5 fw-bold text-danger">Producto no encontrado</div>;
  }

  // Renderizado principal.
  return (
    <div className="w-100 position-relative pt-4">
      <ItemDetail
        product={product}
        currentImageIndex={currentImageIndex}
        onImageChange={setCurrentImageIndex}
      />
    </div>
  );
};

// Exportamos el componente ItemDetailContainer.
export default ItemDetailContainer;
