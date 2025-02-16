//IMPORTS DE REACT
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';

//IMPORTS DE COMPONENTES
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import MyOrders from './components/MyOrders';

//IMPORTS DE FIREBASE
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyAxj6WQNIEzCFuK8NyXqnMWhKHOtoPrGyE",
    authDomain: "codermimatri.firebaseapp.com",
    projectId: "codermimatri",
    storageBucket: "codermimatri.appspot.com",
    messagingSenderId: "964385798831",
    appId: "1:964385798831:web:42fcaaf728f6a3f8a1725a",
    measurementId: "G-58F87S04QX"
};

// Inicializar Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

// Configurar persistencia.
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log('Persistencia configurada correctamente'))
    .catch(error => console.error('Error al configurar persistencia:', error));

// Configurar el proveedor de Google.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
    access_type: 'offline',
    display: 'popup',
    redirect_uri: window.location.origin
});

// Autenticación.
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Usuario autenticado:", result.user);
        return result.user;
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.log("Ventana de autenticación cerrada por el usuario");
            return null;
        }
        console.error("Error al iniciar sesión con Google:", error);
        throw error;
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        console.log("Sesión cerrada correctamente");
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        throw error;
    }
};

// Instancias y funciones de Firebase.
export { auth, db, storage, signInWithGoogle, logout };

// ESTILOS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// RUTAS
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:id" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
    );
};

export { AppRoutes };

// COMPONENTE PRINCIPAL
import App from './App.jsx';

// RENDERIZACIÓN DE LA APLICACIÓN
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
