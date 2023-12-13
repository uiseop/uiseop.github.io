import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { keyframes } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { toastMessageAtom } from '@atom/index';

const modalRoot = document.getElementById('modal') as Element;

const ToastModal = () => {
	const toastMessage = useAtomValue(toastMessageAtom);

	if (!toastMessage) return;

	console.log('helo?');

	return createPortal(<Wrapper>{toastMessage}</Wrapper>, modalRoot);
};

const fadeOut = keyframes`
		0% {
			opacity: 0;
			bottom: 30px;
		}
		80% {
			opacity: 1;
			bottom: 61px;
		}
		100% {
			opacity: 0;
			bottom: 30px;
		}
	`;

const Wrapper = styled.div({
	position: 'fixed',
	left: '50%',
	transform: 'translate3d(-50%, 20px, 0)',
	bottom: '30px',
	borderRadius: '2rem',
	opacity: 0,
	padding: '10px 20px',
	backgroundColor: 'rgba(55, 55, 55, 0.85)',
	color: '#f1f1f1',
	animation: `${fadeOut} 2.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
});

export default ToastModal;
