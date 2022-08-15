import React, {ReactNode} from 'react';
import classes from './Card.module.css';

interface PropsCard {
    children: ReactNode
}

const Card: React.FC<PropsCard> = (props) => {
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    );
};

export default Card;