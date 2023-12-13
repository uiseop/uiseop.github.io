import styled from '@emotion/styled';
import { theme } from './theme';
import { Outlet } from 'react-router-dom';
import { Footer, ScrollHandler } from '.';

export const Template = () => {
	return (
		<>
			<Wrapper>
				<Outlet />
				<Footer />
				<ScrollHandler />
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div({
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
	alignItems: 'center',
	minWidth: '375px',
	padding: '0 15px',
	backgroundColor: theme.colors.background,
});
