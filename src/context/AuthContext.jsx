// AUTHCONTEXT

/**
 * Objetivo:
 * - Proporcionar autenticación y gestión de usuario.
 * - Gestionar el estado de autenticación.
 * - Manejar errores de autenticación.
 * - Proveer métodos de login/logout.
 * 
 */

// IMPORTS
// Contexto.
import { createContext, useState, useContext, useEffect } from 'react';
// Tipos de props.
import PropTypes from 'prop-types';
// Firebase.
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, logout } from '../main';

// COMPONENTE PRINCIPAL

// Contexto.    
const AuthContext = createContext();

// Hook.    
export const useAuth = () => {
    return useContext(AuthContext);
};

// Componente.      
export const AuthProvider = ({ children }) => {
    // Estados para gestionar la autenticación.
    const [user, setUser] = useState(null);           // Estado del usuario actual.
    const [loading, setLoading] = useState(true);     // Estado de carga inicial.
    const [error, setError] = useState(null);         // Estado de errores.

    // Autenticación.
    useEffect(() => {
        // Cambios de estado de autenticación.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);        // Actualiza estado del usuario.
            setLoading(false);           // Finaliza carga inicial.
            setError(null);              // Limpia errores previos.
        });

        // Limpieza Autenticación al desuscribirse.
        return () => unsubscribe();
    }, []);

    // Sesión con Google.
    const loginWithGoogle = async () => {
        try {
            setError(null);
            return await signInWithGoogle();
        } catch (error) {
            console.error("Error en login con Google:", error);
            let errorMessage = "Error al iniciar sesión con Google";
            
            // Manejo de diferentes tipos de errores de autenticación.
            switch (error.code) {
                case 'auth/configuration-not-found':
                    errorMessage = "Error de configuración en Firebase.";
                    console.error("Detalles del error:", error);
                    break;
                case 'auth/popup-blocked':
                    errorMessage = "El popup fue bloqueado por el navegador. Por favor, permite ventanas emergentes.";
                    break;
                case 'auth/popup-closed-by-user':
                    errorMessage = "Inicio de sesión cancelado.";
                    break;
                case 'auth/cancelled-popup-request':
                    errorMessage = "Solicitud de inicio de sesión cancelada.";
                    break;
                case 'auth/internal-error':
                    errorMessage = "Error interno de Firebase. Por favor, intenta de nuevo.";
                    console.error("Detalles del error interno:", error);
                    break;
                default:
                    errorMessage = `Error: ${error.message}`;
                    console.error("Error desconocido:", error);
            }
            
            setError(errorMessage);      // Actualiza estado de error.
            throw error;                 // Propaga el error.
        }
    };

    // Cierre de sesión.
    const handleLogout = async () => {
        try {
            setError(null);              // Limpia errores previos.
            await logout();              // Ejecuta logout de Firebase.
        } catch (error) {
            console.error("Error en logout:", error);
            setError("Error al cerrar sesión");
            throw error;                 // Propaga el error.
        }
    };

    // Valores del contexto.
    const value = {
        user,                           // Usuario actual.
        loading,                        // Estado de carga.
        error,                          // Estado de error.
        loginWithGoogle,                // Función login con Google.
        logout: handleLogout            // Función logout.
    };

    // Renderizado.
    return (
        <AuthContext.Provider value={value}>
            {/* Renderiza solo cuando no está cargando */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Propiedades.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}; 