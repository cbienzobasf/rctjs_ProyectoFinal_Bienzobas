import { db } from '../main';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

export const checkStock = async (productId, requestedQuantity) => {
    try {
        const docRef = doc(db, 'items', productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.error('Producto no encontrado');
            return false;
        }

        const product = docSnap.data();
        return product.stock >= requestedQuantity;
    } catch (error) {
        console.error('Error al verificar stock:', error);
        return false;
    }
};

export const updateStock = async (productId, quantity) => {
    try {
        const docRef = doc(db, 'items', productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('Producto no encontrado');
        }

        const product = docSnap.data();
        const newStock = product.stock - quantity;

        if (newStock < 0) {
            throw new Error('Stock insuficiente');
        }

        await updateDoc(docRef, {
            stock: newStock
        });

        return true;
    } catch (error) {
        console.error('Error al actualizar stock:', error);
        throw error;
    }
};

export const subscribeToStock = (productId, callback) => {
    const productRef = doc(db, 'items', productId);
    return onSnapshot(productRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().stock);
        }
    });
}; 