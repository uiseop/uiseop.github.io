import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { ToastContent } from 'types';
import { ReactNode, useEffect, useState } from 'react';

interface ToastModalProps {
	children: ToastContent;
}

export const ToastModal = ({ children }: ToastModalProps) => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	return mounted ? (
		createPortal(
			<Wrapper>{children as ReactNode}</Wrapper>,
			document.getElementById('modal') as HTMLElement,
		)
	) : (
		<></>
	);
};

const Wrapper = styled.div({
	position: 'fixed',
	left: '50%',
	transform: 'translate3d(-50%, 20px, 0)',
	bottom: '30px',
});
