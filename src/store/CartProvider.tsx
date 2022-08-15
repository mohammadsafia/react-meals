import React, {ReactNode, useReducer} from "react";
import CartContext, {CartContextInterface} from "./cart-context";
import {CartItemsInterface} from "../components/Cart/Cart";


type CartState = {
    items: CartItemsInterface[];
    totalAmount: number;
}

enum ActionType {
    ADD_ITEM = 'ADD_CART_ITEM',
    REMOVE_ITEM = "REMOVE_CART_ITEM"
}

type Action =
    { type: ActionType.ADD_ITEM, item: CartItemsInterface }
    | { type: ActionType.REMOVE_ITEM, itemId: string }

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state: CartState, action: Action) => {
    if (action.type === ActionType.ADD_ITEM) {
        const updatedTotalAmount = state.totalAmount + action.item.price! * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    if (action.type === ActionType.REMOVE_ITEM) {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.itemId);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price!;
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.itemId)
        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {items: updatedItems, totalAmount: updatedTotalAmount}
    }
    return defaultCartState;
}


interface PropsCartProvider {
    children: ReactNode;
}

const CartProvider: React.FC<PropsCartProvider> = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler = (item: CartItemsInterface) => {
        dispatchCartAction({
            type: ActionType.ADD_ITEM,
            item
        })
    };

    const removeItemFromCartHandler = (id: string) => {
        dispatchCartAction({
            type: ActionType.REMOVE_ITEM,
            itemId: id
        })
    }

    const cartContext: CartContextInterface = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;