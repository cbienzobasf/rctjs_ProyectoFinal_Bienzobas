# Proyecto Final
# E-commerce para venta de productos para celebración de Matrimonios.

**Autor:** Carlos Biénzobas

## Tecnologías Utilizadas
- **HTML5**: Estructura principal de la página web.
- **JavaScript (ES6+)**: Lógica de la aplicación.
- **Vite-ReactJs**: Framework utilizado para crear la aplicación.
- **Bootstrap 5**: Framework CSS para diseño responsive.
- **Firebase**: Base de datos y autenticación.
- **React Context**: Manejo de estado global.
- **React Router**: Navegación entre componentes.
- **React Icons**: Iconografía.
- **LocalStorage**: Persistencia de datos local.

## Descripción del Proyecto

Este proyecto corresponde a la entrega final del curso de React JS de CoderHouse. Es una plataforma de e-commerce para la venta de productos para celebración de matrimonios. La aplicación incluye:

- Autenticación de usuarios con Google/Firebase.
- Catálogo de productos con filtrado por categorías.
- Carrito de compras con persistencia.
- Lista de deseos (Wishlist) con sincronización.
- Checkout con validación.
- Validación de stock en tiempo real.
- Sistema de órdenes y seguimiento.

### Entregas Anteriores:
- [pre-Entrega 1](https://github.com/cbienzobasf/rctjs_preEntrega1_Bienzobas)
- [pre-Entrega 2](https://github.com/cbienzobasf/rctjs_preEntrega2_Bienzobas)

## Contenido del Proyecto

### Componentes Principales (.jsx)
- `src/App.jsx`: Componente raíz, configuración de rutas y providers.
- `src/main.jsx`: Punto de entrada, configuración de Firebase y renderizado principal.

### Componentes de Navegación
- `src/components/NavBar.jsx`: Barra de navegación y menú principal.
- `src/components/CartWidget.jsx`: Indicador del carrito en la navegación.
- `src/routes/index.jsx`: Configuración de rutas de la aplicación.

### Componentes de Productos
- `src/components/ItemListContainer.jsx`: Contenedor principal del catálogo.
- `src/components/ItemList.jsx`: Renderizado del grid de productos.
- `src/components/ItemDetailContainer.jsx`: Contenedor de detalles de producto.
- `src/components/ItemDetail.jsx`: Vista detallada del producto.
- `src/components/ItemCount.jsx`: Control de cantidad para agregar al carrito.

### Componentes de Carrito y Checkout
- `src/components/Cart.jsx`: Gestión y vista del carrito de compras.
- `src/components/CartItem.jsx`: Elemento individual del carrito.
- `src/components/Checkout.jsx`: Proceso de finalización de compra.
- `src/components/OrderConfirmation.jsx`: Confirmación de orden.

### Componentes de Usuario
- `src/components/Login.jsx`: Manejo de autenticación.
- `src/components/MyOrders.jsx`: Historial de órdenes del usuario.
- `src/components/Wishlist.jsx`: Lista de deseos del usuario.

### Contextos
- `src/context/AuthContext.jsx`: Gestión de autenticación y sesión de usuario.
- `src/context/CartContext.jsx`: Estado global del carrito y sus operaciones.
- `src/context/WishlistContext.jsx`: Estado global de la lista de deseos.

### Utilidades
- `src/utils/formatters.jsx`: Funciones de formateo (precios, fechas, etc.).
- `src/utils/validators.jsx`: Funciones de validación.
- `src/utils/firebase.jsx`: Configuración y utilidades de Firebase.

## Funcionalidades Principales

1. **Gestión de Usuarios**:
   - Login con Google Authentication.
   - Persistencia de sesión.
   - Checkout personalizado con email del usuario.
   - Manejo de errores de autenticación.

2. **Catálogo y Productos**:
   - Filtrado por categorías:
     - Invitaciones.
     - Decoración.
     - Recuerdos.
     - Accesorios.
     - Iluminación.
   - Carrusel de imágenes.
   - Indicador de stock disponible.
   - Detalles completos del producto.

3. **Carrito de Compras**:
   - Agregar/eliminar productos.
   - Ajuste de cantidades con validación.
   - Validación de stock en tiempo real.
   - Visualización de subtotales y total.
   - Persistencia en localStorage.
   - Vista imágenes en miniatura productos.
   - Sincronización entre pestañas.

4. **Lista de Deseos (Wishlist)**:
   - Agregar/quitar productos.
   - Sincronización con Firestore para usuarios autenticados.
   - Persistencia local para usuarios no autenticados.
   - Migración automática al iniciar sesión.
   - Contador en navbar.
   - Transferencia al carrito.

5. **Proceso de Compra**:
   - Formulario checkout con validaciones.
   - Validación de stock final.
   - Generación de orden con ID único.
   - Confirmación de compra.
   - Validación de usuario.
   - Registro en Firestore.

6. **Gestión de Órdenes**:
   - Búsqueda por ID de orden.
   - Visualización detallada:
     - Estado de la orden.
     - Lista de productos.
     - Subtotales y total.
     - Fecha de generación.
   - Privacidad de datos del comprador.

## Contextos Implementados

1. **AuthContext**:
   - Gestión de autenticación con Google.
   - Manejo de errores detallado.
   - Persistencia de sesión.
   - Estados de carga y error.

2. **CartContext**:
   - Gestión del carrito con localStorage.
   - Cálculos de totales.
   - Validaciones de stock.

3. **WishlistContext**:
   - Sincronización Firestore/localStorage.
   - Migración automática de datos.
   - Gestión según estado de autenticación.
   - Persistencia adaptativa.

## Integración con Firebase

1. **Colecciones**:
   - `items`: Catálogo completo.
   - `orders`: Registro de compras.
   - `categories`: Categorías de productos.
   - `wishlists`: Listas de deseos por usuario.

2. **Funcionalidades**:
   - Autenticación con Google.
   - Consultas en tiempo real.
   - Validación de stock.
   - Almacenamiento de órdenes.
   - Sincronización de wishlist.

Nota: Stock de productos se registra dentro de items.

## Cumplimiento Requerimientos

### Requisitos Base
1. **Navegación Inicial ('/')**
   - Catálogo completo implementado en `ItemListContainer` con grid responsive de productos.
   - CartWidget visible en NavBar con contador dinámico de items y acceso a `/cart`.

2. **Navegación por Categorías ('/categories/:categoryId')**
   - Menú desplegable en NavBar con categorías dinámicas desde Firestore.
   - Filtrado automático de productos por categoría usando `useParams`.

3. **Detalle de Producto ('/item/:id')**
   - Vista detallada con `ItemDetail` mostrando imágenes, descripción y precio.
   - Manejo de errores para productos inexistentes con feedback visual.

4. **Implementación Firebase**
   - Colección `items`: productos con imágenes, precios, descripción y categoría.
   - Colección `orders`: registro de órdenes con items, fecha y estado.

5. **Carrito Funcional**
   - Persistencia en localStorage y sincronización entre pestañas.
   - Contador global en NavBar sumando cantidades de todos los items.

6. **Proceso de Checkout**
   - Formulario validado para datos de contacto con verificación de email.
   - Resumen de orden con items, cantidades y total antes de confirmar.

7. **Finalización de Compra**
   - Generación de orderID único en Firestore con feedback inmediato.
   - Validación final de stock antes de confirmar la orden.

### Requisitos Extra Implementados
1. **Autenticación**
   - Login con Google implementado usando Firebase Authentication.
   - Checkout personalizado mostrando email del usuario autenticado.

2. **Wishlist**
   - Lista de deseos sincronizada con Firestore para usuarios autenticados.
   - Persistencia local para usuarios no autenticados con migración automática al login.

3. **Control de Stock**
   - Validación en tiempo real del stock disponible.
   - Verificación final antes de generar la orden.

4. **Categorías Dinámicas**
   - Menú de categorías alimentado desde colección Firestore.
   - Actualización automática del menú al agregar nuevas categorías.

5. **Carrito Persistente**
   - Implementación de localStorage para persistencia del carrito.
   - Sincronización entre pestañas del navegador.

6. **Gestión de Órdenes**
   - Búsqueda de órdenes por ID con visualización detallada.
   - Protección de datos personales en la visualización de órdenes.

## Instrucciones de Instalación

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/cbienzobasf/rctjs_ProyectoFinal_Bienzobas
   ```

2. **Instalar Dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Firebase**:
   - Credenciales Firebase en `src/main.jsx`.

4. **Ejecutar en Desarrollo**:
   ```bash
   npm run dev
   ```