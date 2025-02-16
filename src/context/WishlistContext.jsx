//WISHLISTCONTEXT

/**
 * Objetivo:
 * - Gestionar lista de deseos del usuario.
 * - Sincronizar datos entre localStorage y Firestore.
 * - Persistir datos según estado de autenticación.
 */

//IMPORTS

// Contexto y hooks.
import { createContext, useState, useContext, useEffect } from 'react';
// Autenticación.
import { useAuth } from './AuthContext';
// Firebase.
import { db } from '../main';
import { doc, setDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// Tipos de props.
import PropTypes from 'prop-types';

// COMPONENTE PRINCIPAL

// Contexto.
const WishlistContext = createContext();
// Clave para localStorage.
const LOCAL_STORAGE_KEY = 'wishlist';

// Hook contexto.
export const useWishlist = () => {
    return useContext(WishlistContext);
};

// Proveedor wishlist.
export const WishlistProvider = ({ children }) => {
    // Estado wishlist.
    const [wishlist, setWishlist] = useState([]);
    // Usuario autenticado.
    const { user } = useAuth();

    // Cargar wishlist inicial según autenticación.
    useEffect(() => {
        if (user) {
            loadWishlistFromFirestore();    // Carga desde Firestore si hay usuario.
        } else {
            loadWishlistFromLocalStorage();  // Carga desde localStorage si no hay usuario.
        }
    }, [user]);

    // Persistir en localStorage si no hay sesión.
    useEffect(() => {
        if (!user) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlist));
        }
    }, [wishlist, user]);

    // Cargar wishlist desde localStorage.
    const loadWishlistFromLocalStorage = () => {
        try {
            const savedWishlist = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.error('Error al cargar wishlist del localStorage:', error);
            setWishlist([]);               
        }
    };

    // Cargar wishlist desde Firestore.
    const loadWishlistFromFirestore = async () => {
        if (!user) return;
        
        try {
            const wishlistRef = doc(db, 'wishlists', user.uid);
            const wishlistDoc = await getDoc(wishlistRef);
            
            if (wishlistDoc.exists()) {
                setWishlist(wishlistDoc.data().items || []);   
            } else {
                await setDoc(wishlistRef, { items: [] });      
                setWishlist([]);
            }
        } catch (error) {
            console.error('Error al cargar wishlist de Firestore:', error);
            setWishlist([]);                
        }
    };

    // Agregar producto a wishlist.
    const addToWishlist = async (product) => {
        if (isInWishlist(product.id)) return;

        if (user) {
            // Guardar en Firestore si hay usuario.
            try {
                const wishlistRef = doc(db, 'wishlists', user.uid);
                await setDoc(wishlistRef, {
                    items: arrayUnion(product)
                }, { merge: true });
            } catch (error) {
                console.error('Error al agregar a wishlist en Firestore:', error);
                return;
            }
        }
        
        // Actualizar estado local.
        setWishlist(prev => [...prev, product]);
    };

    // Eliminar producto de wishlist.
    const removeFromWishlist = async (productId) => {
        if (user) {
            // Remover de Firestore si hay usuario.
            try {
                const wishlistRef = doc(db, 'wishlists', user.uid);
                const productToRemove = wishlist.find(item => item.id === productId);
                
                await setDoc(wishlistRef, {
                    items: arrayRemove(productToRemove)
                }, { merge: true });
            } catch (error) {
                console.error('Error al remover de wishlist en Firestore:', error);
                return;
            }
        }
        
        // Actualizar estado local.
        setWishlist(prev => prev.filter(item => item.id !== productId));
    };

    // Verificar si un producto está en wishlist.
    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    // Migrar wishlist local a Firestore.
    const migrateLocalToFirestore = async () => {
        if (!user) return;

        try {
            const localWishlist = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
            if (localWishlist.length > 0) {
                const wishlistRef = doc(db, 'wishlists', user.uid);
                await setDoc(wishlistRef, {
                    items: localWishlist
                }, { merge: true });
                localStorage.removeItem(LOCAL_STORAGE_KEY);   
            }
        } catch (error) {
            console.error('Error al migrar wishlist local a Firestore:', error);
        }
    };

    // Migrar datos cuando el usuario inicia sesión.
    useEffect(() => {
        if (user) {
            migrateLocalToFirestore();
        }
    }, [user]);

    // Valores contexto.
    const value = {
        wishlist,                    // Estado de wishlist.
        addToWishlist,              // Agregar producto.
        removeFromWishlist,         // Eliminar producto.
        isInWishlist               // Verificar producto.
    };

    // Renderizado.
    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

// Propiedades.
WishlistProvider.propTypes = {
    children: PropTypes.node.isRequired
}; 