import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { theme } from './theme';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Template: FunctionComponent = () => {
	return (
		<>
			<Wrapper>
				<Outlet />
				<Footer />
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

export default Template;
