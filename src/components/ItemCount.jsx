//IMPORTS
// Hook manejo estados.
import { useState } from 'react';
// Prop-types.
import PropTypes from 'prop-types';

// ITEMCOUNT

/**
 * Objetivo:
 * - Manejo de la cantidad de un producto.
 *
 * @param {number} stock - Cantidad disponible del producto.
 * @param {number} initial - Valor inicial del contador (default: 1).
 * @param {function} onAdd - Función callback que se ejecuta al agregar al carrito.
 * @param {function} onChange - Función callback que notifica cambios en la cantidad.
 */

// Componente principal.

// Props.
const ItemCount = ({ stock, initial = 1, onAdd, onChange }) => {
  // Cantidad seleccionada.
  const [count, setCount] = useState(initial);

  // Manejadores de eventos.
  // Incrementar el contador.
  const increment = () => {
    if (count < stock) {
      const newCount = count + 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  // Decrementar el contador.
  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  // Renderizado
  return (
    <div className="d-flex flex-column align-items-center">
      {/* Botones para ajustar cantidad */}
      <div className="btn-group mb-3" role="group" aria-label="Cantidad" style={{ width: '222px' }}>
        {/* Botón para decrementar */}
        <button 
          className="btn btn-outline-success" 
          onClick={decrement}
          disabled={count <= 1}
        >
          -
        </button>
        {/* Mostrador de cantidad actual */}
        <span className="btn btn-outline-success disabled">
          {count}
        </span>
        {/* Botón para incrementar */}
        <button 
          className="btn btn-outline-success" 
          onClick={increment}
          disabled={count >= stock}
        >
          +
        </button>
      </div>
      {/* Botón para agregar al carrito */}
      <button 
        className="btn btn-success"
        onClick={() => onAdd(count)}
        disabled={stock <= 0}
        style={{ width: '222px', height: '38px' }}
      >
        {stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
      </button>
    </div>
  );
};

// Validación de props.	
ItemCount.propTypes = {
  stock: PropTypes.number.isRequired, // Stock disponible (requerido)
  initial: PropTypes.number, // Valor inicial (opcional)
  onAdd: PropTypes.func.isRequired, // Función callback (requerida)
  onChange: PropTypes.func // Función callback para notificar cambios (opcional)
};

// Exportamos componente ItemCount.
export default ItemCount; 