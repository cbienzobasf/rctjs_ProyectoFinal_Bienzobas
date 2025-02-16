// STOCKVALIDATOR

/**
 * Objetivo:
 * - Validar stock en tiempo real.
 * - Mostrar alertas cuando no hay stock suficiente.
 * 
 * @param {string} productId - ID del producto a validar.
 * @param {number} desiredQuantity - Cantidad deseada por el usuario.
 */

// IMPORTS
// Hooks estado y efectos.
import { useState, useEffect } from 'react';
// Tipos de props.
import PropTypes from 'prop-types';
// Cambios de stock.
import { subscribeToStock } from '../services/stockService';
// Componente Bootstrap.
import { Alert } from 'react-bootstrap';

// COMPONENTE PRINCIPAL

const StockValidator = ({ productId, desiredQuantity }) => {
    // Stock actual del producto.
    const [currentStock, setCurrentStock] = useState(null);
    // Validación cantidad.
    const [isValid, setIsValid] = useState(true);

    // Stock.
    useEffect(() => {
        // Uso stock.
        const unsubscribe = subscribeToStock(productId, (stock) => {
            // Actualización stock actual.
            setCurrentStock(stock);
            // Validación cantidad.
            setIsValid(stock >= desiredQuantity);
        });

        // Desuso stock.
        return () => unsubscribe();
    }, [productId, desiredQuantity]);

    // Renderizado condicional.
    if (!isValid) {
        return (
            <Alert variant="danger" className="mt-2">
                ¡Stock insuficiente! Solo quedan {currentStock} unidades disponibles.
            </Alert>
        );
    }

    // Si hay stock suficiente, no renderizamos nada
    return null;
};

// Props.
StockValidator.propTypes = {
    productId: PropTypes.string.isRequired,    // ID del producto a validar.
    desiredQuantity: PropTypes.number.isRequired // Cantidad deseada por el usuario.
};

// Exportamos el componente StockValidator.
export default StockValidator; 