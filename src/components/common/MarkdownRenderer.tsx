import Markdown from 'react-markdown';
import React, { FunctionComponent } from 'react';
import { theme } from './theme';
import styled from '@emotion/styled';
import matter, { GrayMatterFile } from 'gray-matter';
import 'dayjs/locale/en';
import Header from '@components/Posts/Header';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Button from './Button';
import toast from '@utils/toast';

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

interface CodeProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {
	className?: string;
}

const MarkdownRednerer: FunctionComponent<MarkdownRednererProps> = ({
	markdown,
}) => {
	const { content, data } = matter(markdown) as CustomGrayMatterFile;

	const handleClick = (code: string) => {
		function copyToClipboard(code: string) {
			navigator.clipboard
				.writeText(code)
				.then(() => {
					toast('복사 완료', { delay: 2000 });
				})
				.catch((err) => {
					toast('복사 실패.. 다시 시도해주세요', { delay: 2000 });
					console.error(err);
				});
		}

		copyToClipboard(code);
	};

	return (
		<Wrapper>
			<Header {...data} />
			<Markdown
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
									wrapLongLines
									customStyle={{ whiteSpace: 'pre-wrap' }}
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
			</Markdown>
		</Wrapper>
	);
};

const PasteWrapper = styled.div({
	position: 'relative',
});

const CustomSyntaxHighligter = styled(SyntaxHighlighter)({
	position: 'relative',
	padding: '55px 25px 25px',
	fontWeight: 500,
	backgroundColor: 'transparent',

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '30px',
		left: 0,
		top: 0,
		width: '100%',
		backgroundColor: theme.colors.background2,
	},

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

const Wrapper = styled.article({
	color: theme.colors.contentText,
	width: '100%',
	maxWidth: '720px',
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
