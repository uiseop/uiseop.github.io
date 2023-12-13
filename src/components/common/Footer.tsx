import styled from '@emotion/styled';
import { theme } from './theme';

export const Footer = () => {
	return (
		<Wrapper>
			© 2023&nbsp;
			<Anchor href="https://github.com/uiseop" target="_blank" rel="noreferrer">
				섭이
			</Anchor>
			&nbsp;powered by&nbsp;
			<Anchor href="https://github.com/uiseop" target="_blank" rel="noreferrer">
				uiseop.github.io
			</Anchor>
		</Wrapper>
	);
};

const Wrapper = styled.footer({
	display: 'flex',
	marginTop: 'auto',
	height: '63px',
	justifyContent: 'center',
	alignItems: 'center',
	color: theme.colors.text,
	backgroundColor: theme.colors.background,
});

const Anchor = styled.a({
	color: theme.colors.anchor,
});
