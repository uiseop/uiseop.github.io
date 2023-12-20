import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface CarouselProps {
	children: ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
	return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div({
	width: '100%',
	overflowX: 'auto',
	whiteSpace: 'nowrap',
});
