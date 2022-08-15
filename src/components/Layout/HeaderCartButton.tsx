import React, {useContext, useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";


interface PropsHeaderCartButton {
    onClick(): void
}

const HeaderCartButton: React.FC<PropsHeaderCartButton> = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartContext = useContext(CartContext);
    const {items} = cartContext;
    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0);

    useEffect(() => {
        if (items.length === 0) return;

        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;