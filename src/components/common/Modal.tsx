import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal') as Element;

type ModalProps = {
	children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
	return createPortal(children, modalRoot);
};

export default Modal;
