import { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { theme } from './theme';
import Footer from './Footer';
import ThemeToggler from './ThemeToggler';

type TemplateProps = {
	children: ReactNode;
};

const Template: FunctionComponent<TemplateProps> = ({ children }) => {
	return (
		<>
			<Wrapper>{children}</Wrapper>
			<ThemeToggler />
			<Footer />
		</>
	);
};

const Wrapper = styled.div({
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	minWidth: '375px',
	backgroundColor: theme.colors.background,
	gap: '135px',
});

export default Template;
