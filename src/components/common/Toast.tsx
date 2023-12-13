import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { ToastProps } from 'types';

const TToast = ({ children, delay = 2000 }: ToastProps) => {
	return <Wrapper delay={delay}>{children as ReactNode}</Wrapper>;
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

const Wrapper = styled.div<{ delay: number }>(({ delay }) => ({
	position: 'absolute',
	transform: 'translate3d(-50%, 20px, 0)',
	borderRadius: '2rem',
	padding: '10px 20px',
	backgroundColor: 'rgba(55, 55, 55, 0.85)',
	color: '#f1f1f1',
	opacity: 0,
	animation: `${fadeOut} ${delay}ms cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
	whiteSpace: 'pre',
}));

export default TToast;
