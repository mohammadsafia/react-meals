import React, {useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
import Input, {InputFieldInterface} from "../../UI/Input";

interface PropsMealItemForm {
    id: string;

    onAddToCart(amount: number): void;
}

const MealItemForm: React.FC<PropsMealItemForm> = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef: any = useRef();
    const input: InputFieldInterface = {
        id: 'amount_' + props.id,
        type: 'number',
        min: 1,
        max: 5,
        step: 1,
        defaultValue: '1'
    };

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNumber)
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label="Amount" input={input}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
};

export default MealItemForm;