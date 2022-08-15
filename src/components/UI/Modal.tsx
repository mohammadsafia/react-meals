import React, {ReactNode} from 'react';
import classes from './Modal.module.css';
import ReactDOM from "react-dom";

interface ModalBase {
    onClose(): void
}

interface PropsModal extends ModalBase {
    children: ReactNode
}

interface PropsBackdrop extends ModalBase {
}

interface PropsModalOverlay {
    children: ReactNode
}


const Backdrop: React.FC<PropsBackdrop> = props => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
};

const ModalOverlay: React.FC<PropsModalOverlay> = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal: React.FC<PropsModal> = (props) => {
    const portalElement = document.getElementById('overlays') as Element
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default Modal;