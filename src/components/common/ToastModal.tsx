import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { ToastContent } from 'types';
import { ReactNode } from 'react';

const modalRoot = document.getElementById('modal') as Element;

interface ToastModalProps {
	children: ToastContent;
}

const ToastModal = ({ children }: ToastModalProps) => {
	return createPortal(
		<Wrapper className="top">{children as ReactNode}</Wrapper>,
		modalRoot,
	);
};

const Wrapper = styled.div({
	position: 'fixed',
	left: '50%',
	transform: 'translate3d(-50%, 20px, 0)',
	bottom: '30px',
});

export default ToastModal;
