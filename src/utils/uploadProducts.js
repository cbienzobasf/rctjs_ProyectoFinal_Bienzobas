import { collection, addDoc } from "firebase/firestore";
import products from "./products.js";
import { db } from '../main';

// Función para cargar productos en Firestore.
async function uploadProducts() {
  try {
    console.log("📤 Iniciando carga de productos...");

    const productsRef = collection(db, "items"); // Referencia a la colección "items".

    for (const product of products) {
      
      const docRef = await addDoc(productsRef, product);

      console.log(`✅ Producto "${product.name}" agregado con ID: ${docRef.id}`);
    }

    console.log("🎉 Todos los productos han sido subidos correctamente.");
  } catch (error) {
    console.error("❌ Error al cargar los productos:", error);
  }
}

uploadProducts();
