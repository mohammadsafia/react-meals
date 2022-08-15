import React, {useContext} from 'react';
import {IMeal} from "../AvailableMeals";
import classes from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

interface PropsMealItem extends Partial<IMeal> {
}

const MealItem: React.FC<PropsMealItem> = (props) => {
    const cartContext = useContext(CartContext);
    const price = `$${props.price?.toFixed(2)}`;

    const addToCartHandler = (amount: number)=> {
        cartContext.addItem({...props, amount})
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id!} />
            </div>
        </li>
    );
};

export default MealItem;