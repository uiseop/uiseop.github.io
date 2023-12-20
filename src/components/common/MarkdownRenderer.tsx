import Markdown from 'react-markdown';
import React from 'react';
import styled from '@emotion/styled';
import matter, { GrayMatterFile } from 'gray-matter';
import 'dayjs/locale/en';
import { theme } from './theme';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { copyToClipboard } from '@utils/index';
import { Header } from '@components/Posts';
import { Button } from '.';

type MarkdownRednererProps = {
	markdown: '*.md';
};

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

export type HeaderProps = {
	title: string;
	date: string;
	categories: string[];
	summary: string;
	author: string;
};

export type CustomGrayMatterFile = GrayMatterFile<
	MarkdownRednererProps['markdown']
> & {
	data: HeaderProps;
};

interface CodeProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {
	className?: string;
}

export const MarkdownRednerer = ({ markdown }: MarkdownRednererProps) => {
	const { content, data } = matter(markdown) as CustomGrayMatterFile;

	function handleClick(code: string) {
		copyToClipboard(code);
	}

	return (
		<Wrapper>
			<Header {...data} />
			<CustomMarkdown
				components={{
					blockquote(props) {
						return <BlockQuoteStyle {...props} />;
					},
					ol(props) {
						return <OrderedListStyle {...props} />;
					},
					ul(props) {
						return <UnOrderedListStyled {...props} />;
					},
					code(props: CodeProps) {
						const { children, className: lang, ...rest } = props;
						const match = /language-(\w+)/.exec(lang || '');
						const code = String(children).replace(/\n$/, '');

						return match ? (
							<>
								<PasteWrapper>
									<Button
										content="복사하기"
										onClick={() => handleClick(code)}
									/>
								</PasteWrapper>
								<CustomSyntaxHighligter
									style={{}}
									useInlineStyles={false}
									language={match[1]}
									// wrapLongLines
								>
									{code}
								</CustomSyntaxHighligter>
							</>
						) : (
							<CodeStyle {...rest}>{children}</CodeStyle>
						);
					},
					a(props) {
						return <AnchorStyle {...props} />;
					},
					h1(props) {
						return <HeadingStyle level={1} {...props} />;
					},
					h2(props) {
						return <HeadingStyle level={2} {...props} />;
					},
					h3(props) {
						return <HeadingStyle level={3} {...props} />;
					},
					h4(props) {
						return <HeadingStyle level={4} {...props} />;
					},
					h5(props) {
						return <HeadingStyle level={5} {...props} />;
					},
				}}
			>
				{content}
			</CustomMarkdown>
		</Wrapper>
	);
};

const Wrapper = styled.article({
	color: theme.colors.contentText,
	width: '100%',
	maxWidth: '720px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	lineHeight: '1.6',
	gap: '24px',
});

const CustomMarkdown = styled(Markdown)({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: '1rem',
	lineHeight: '1.5',

	'& > :first-of-type': {
		marginTop: 0,
	},

	'& > pre': {
		margin: '35px auto',

		'& > pre': {
			margin: 0,
		},
	},

	'& pre': {
		maxWidth: '100%',
		display: 'inline-block',
	},

	'p em': {
		display: 'block',
		textAlign: 'center',
	},

	'blockquote, details, dl, il, p, pre, ul': {
		lineHeight: '1.6',
		wordWrap: 'break-word',
	},

	img: {
		display: 'block',
		margin: '0 auto',
	},
});

const PasteWrapper = styled.div({
	position: 'relative',
	height: '30px',
	backgroundColor: theme.colors.background2,

	'&::after': {
		content: '""',
		position: 'absolute',
		background: '#fc625d',
		borderRadius: '50%',
		boxShadow: '20px 0 #fdbc40, 40px 0 #35cd4b',
		height: '12px',
		left: '12px',
		top: '9px',
		width: '12px',
	},
});

const CustomSyntaxHighligter = styled(SyntaxHighlighter)({
	position: 'relative',
	padding: '25px',
	fontWeight: 500,
	backgroundColor: 'transparent',
	overflow: 'auto',
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
