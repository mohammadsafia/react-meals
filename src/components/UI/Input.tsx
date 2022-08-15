import React, {InputHTMLAttributes} from 'react';
import classes from './Input.module.css';

export interface InputFieldInterface extends Partial<InputHTMLAttributes<HTMLInputElement>> {
}

interface PropsInput {
    label: string;
    input: InputFieldInterface;
}

const Input = React.forwardRef<HTMLInputElement, PropsInput>((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
})

export default Input;