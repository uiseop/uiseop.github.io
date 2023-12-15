import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import { HeaderProps } from '@components/common/MarkdownRenderer';
import { theme } from '@components/common/theme';
import { Categories, Date } from '@components/common';

export const Header: FunctionComponent<HeaderProps> = ({
	title,
	date,
	categories,
}) => {
	return (
		<Wrapper>
			<h1>{title}</h1>
			<div>
				<Date date={date} />
				<Categories categories={categories} withLink />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.header({
	borderBottom: `1px solid ${theme.colors.postCardBorder}`,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	marginTop: '80px',
	fontSize: '2rem',
	width: '100%',

	h1: {
		color: theme.colors.text,
		fontWeight: 600,
		fontSize: '2rem',
		marginBottom: '6px',
	},

	div: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		fontSize: '1.1rem',
		fontWeight: 500,
		lineHeight: '1.5',
		marginBottom: '5px',
		gap: '8px',

		span: {
			color: theme.colors.secondaryText,
		},

		'& > *:not(:last-child)': {
			borderRight: `2px solid ${theme.colors.postCardBorder}`,
			paddingRight: '8px',
		},
	},
});
