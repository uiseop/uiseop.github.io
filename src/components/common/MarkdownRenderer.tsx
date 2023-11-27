import Markdown, { ReactRenderer } from 'marked-react';
import { FunctionComponent, ReactNode } from 'react';
import { theme } from './theme';
import styled from '@emotion/styled';
import matter, { GrayMatterFile } from 'gray-matter';
import 'dayjs/locale/en';
import Header from '@components/Posts/Header';

type MarkdownRednererProps = {
	markdown: '*.md';
};

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

export type HeaderProps = {
	title: string;
	date: string;
	categories: string[];
};

type CustomGrayMatterFile = GrayMatterFile<
	MarkdownRednererProps['markdown']
> & {
	data: HeaderProps & {
		[key: string]: any;
	};
};

const Blockquote: ReactRenderer['blockquote'] = (children: ReactNode) => {
	return <BlockQuoteStyle>{children}</BlockQuoteStyle>;
};

const List: ReactRenderer['list'] = (children: ReactNode, ordered) => {
	if (ordered) {
		return <OrderedListStyle>{children}</OrderedListStyle>;
	}
	return <UnOrderedListStyled>{children}</UnOrderedListStyled>;
};

const CodeSpan: ReactRenderer['codespan'] = (children: ReactNode) => {
	return <CodeStyle>{children}</CodeStyle>;
};

const Anchor: ReactRenderer['link'] = (href, text) => {
	return <AnchorStyle href={href}>{text}</AnchorStyle>;
};

const Heading: ReactRenderer['heading'] = (children, level) => {
	return <HeadingStyle level={level}>{children}</HeadingStyle>;
};

const MarkdownRednerer: FunctionComponent<MarkdownRednererProps> = ({
	markdown,
}) => {
	const { content, data } = matter(markdown) as CustomGrayMatterFile;

	return (
		<Wrapper>
			<Header {...data} />
			<Markdown
				renderer={{
					blockquote: Blockquote,
					codespan: CodeSpan,
					list: List,
					link: Anchor,
					heading: Heading,
				}}
			>
				{content}
			</Markdown>
		</Wrapper>
	);
};

const Wrapper = styled.article({
	color: theme.colors.contentText,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '24px',
	lineHeight: '1.6',
});

const BlockQuoteStyle = styled.blockquote({
	backgroundColor: theme.colors.blockquoteBackground,
	borderLeft: `.25rem solid ${theme.colors.primary}`,
	padding: '.5rem 1rem',
});

const OrderedListStyle = styled.ol({
	listStyleType: 'number',
	paddingLeft: '2rem',
	width: '100%',
});

const UnOrderedListStyled = styled.ul({
	listStyleType: 'disc',
	paddingLeft: '2rem',
	width: '100%',
});

const CodeStyle = styled.code({
	backgroundColor: theme.colors.aboutLinkIconHover,
	borderRadius: '3px',
	fontSize: '.85rem',
	fontWeight: 700,
	padding: '.2rem .4rem',
});

const AnchorStyle = styled.a({
	borderBottom: '.05rem solid',
	borderBottomColor: theme.colors.primary,
	color: theme.colors.primary,
});

const getHeadingStyle = (level: HeadingLevels) => {
	switch (level) {
		case 1:
			return '2.5em'; // h1에 해당하는 스타일
		case 2:
			return '2em'; // h2에 해당하는 스타일
		case 3:
			return '1.5em'; // h3에 해당하는 스타일
		default:
			return '1em'; // 기본값
	}
};

type HeadingProps = {
	level: HeadingLevels;
};

const HeadingStyle = styled.hgroup<HeadingProps>(
	{
		color: theme.colors.text,
		fontWeight: 600,
		lineHeight: '1.25',
		marginTop: '40px',
		alignSelf: 'flex-start',
	},
	({ level }) => ({
		fontSize: getHeadingStyle(level),
	}),
);

export default MarkdownRednerer;
