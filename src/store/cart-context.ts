import React from 'react';
import {CartItemsInterface} from "../components/Cart/Cart";

export interface CartContextInterface {
    items: CartItemsInterface[];
    totalAmount: number;

    addItem(item: CartItemsInterface): void;

    removeItem(id: string): void;
}

const CartContext = React.createContext<CartContextInterface>({
    items: [],
    totalAmount: 0,
    addItem: (item) => {
    },
    removeItem: (id) => {
    }
});

export default CartContext;