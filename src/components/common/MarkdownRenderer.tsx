import Markdown from 'marked-react';
import { FunctionComponent, ReactNode } from 'react';
import { theme } from './theme';
import styled from '@emotion/styled';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

type MarkdownRednererProps = {
	markdown: '*.md';
};

const Blockquote = (children: ReactNode) => {
	return <BlockQuoteStyle>{children}</BlockQuoteStyle>;
};

const MarkdownRednerer: FunctionComponent<MarkdownRednererProps> = ({
	markdown,
}) => {
	const {
		content,
		data: { title, date, categories },
	} = matter(markdown);

	const formattedDate = dayjs(date).locale('en').format('MMMM DD, YYYY');

	const category = categories.join(' ');

	return (
		<Wrapper>
			<Header>
				<h1>{title}</h1>
				<div>
					{formattedDate} |&nbsp;<span>{category}</span>
				</div>
			</Header>
			<Markdown
				renderer={{
					blockquote: Blockquote,
				}}
			>
				{content}
			</Markdown>
		</Wrapper>
	);
};

const Wrapper = styled.article({
	color: theme.colors.contentText,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '24px',
});

const Header = styled.header({
	borderBottom: `1px solid ${theme.colors.postCardBorder}`,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	marginTop: '80px',

	h1: {
		color: theme.colors.text,
		fontWeight: 600,
		lineHeight: '1.3',
		fontSize: '2rem',
		marginBottom: '6px',
	},

	div: {
		color: theme.colors.secondaryText,
		display: 'flex',
		flexWrap: 'wrap',
		fontSize: '1.1rem',
		fontWeight: 500,
		lineHeight: '1.5',
		marginBottom: '5px',

		span: {
			color: theme.colors.text,
		},
	},
});

const BlockQuoteStyle = styled.blockquote({
	backgroundColor: theme.colors.blockquoteBackground,
	borderLeft: `.25rem solid ${theme.colors.blockquoteBorder}`,
	padding: '.5rem 1rem',
});

export default MarkdownRednerer;
