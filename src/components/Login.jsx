// LOGIN

/**
 * Objetivo:
 * - Inicio de sesión con Google.
 * - Visualización del estado de autenticación.
 * - Cierre de sesión.
 * - Manejo de errores de autenticación.
 * 
 */

// IMPORTS
// Manejo de autenticación.
import { useAuth } from '../context/AuthContext';
// Componentes Bootstrap.
import { Button, Alert } from 'react-bootstrap';
// Ícono Google/Gmail para login
import { FaGoogle } from 'react-icons/fa';

// COMPONENTE PRINCIPAL

const Login = () => {
    // Contexto autenticación.
    const { user, loginWithGoogle, logout, error } = useAuth();

    // Inicio sesión.
    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    // Cierre sesión.
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Renderizado.
    return (
        <div className="d-flex align-items-center flex-column">
            {/* Alertas de error */}
            {error && (
                <Alert variant="danger" className="mb-2 p-2">
                    {error}
                </Alert>
            )}
            
            {/* Renderizado condicional */}
            {user ? (
               
                <div className="d-flex align-items-center gap-2">
                    {/* Email usuario */}
                    <span className="text-success">
                        {user.email}
                    </span>
                    {/* Botón cierre sesión */}
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </Button>
                </div>
            ) : (
                // Botón inicio sesión usuario no autenticado
                <Button 
                    variant="outline-success" 
                    onClick={handleGoogleLogin}
                    className="d-flex align-items-center gap-2"
                >
                    <FaGoogle /> Iniciar con Google
                </Button>
            )}
        </div>
    );
};

// Exportamos el componente Login.
export default Login; 