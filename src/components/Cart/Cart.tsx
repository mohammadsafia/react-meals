import React, {useContext} from 'react';
import classes from './Cart.module.css';
import {IMeal} from "../Meals/AvailableMeals";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

interface PropsCart {
    onCloseCart(): void;
}

export interface CartItemsInterface extends Partial<IMeal> {
    amount: number;
}

const Cart: React.FC<PropsCart> = (props) => {
    const cartCtx = useContext(CartContext);
    const items: CartItemsInterface[] = cartCtx.items;
    const totalAmount = `$${cartCtx.totalAmount?.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id: string) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item: CartItemsInterface) => {
        cartCtx.addItem({...item, amount: 1})
    }
    const cartItems = (
        <ul className={classes['cart-items']}>
            {items.map((item) => (
                <CartItem
                    {...item}
                    key={item.id}
                    onAdd={() => cartItemAddHandler(item)}
                    onRemove={() => cartItemRemoveHandler(item.id!)}
                />
            ))}
        </ul>
    );
    return (
        <Modal onClose={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCloseCart} className={classes['button--alt']}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;