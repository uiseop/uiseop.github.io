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
			<Wrapper>
				{children}
				<Footer />
			</Wrapper>
			<ThemeToggler />
		</>
	);
};

const Wrapper = styled.div({
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
	alignItems: 'center',
	minWidth: '375px',
	backgroundColor: theme.colors.background,
});

export default Template;
