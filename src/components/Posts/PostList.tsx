import { theme } from '@components/common/theme';
import { ellipsis } from '@components/styles/ellipsis';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';
import { CustomGrayMatterFile } from '@components/common/MarkdownRenderer';
import { Categories, Date } from '@components/common';
import { MdFile } from 'types';

interface PostListProps {
	files: MdFile[];
}

export const PostList = ({ files }: PostListProps) => {
	return (
		<Wrapper>
			{files.map(({ file, key }) => {
				const { data, excerpt } = matter(file, {
					excerpt: true,
				}) as CustomGrayMatterFile;
				return (
					<li key={key}>
						<Link to={`/posts/${key}`} state={{ markdown: file, data }}>
							<PostTitle>{data.title}</PostTitle>
							<PostContet>{excerpt}</PostContet>
							<PostInfoWrapper>
								<Date date={data.date} />
								<Categories categories={data.categories} />
							</PostInfoWrapper>
						</Link>
					</li>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.ul({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',

	'& > li': {
		border: `1px solid ${theme.colors.postCardBorder}`,
		borderRadius: '6px',
		color: theme.colors.text,
		padding: '15px',
		cursor: 'pointer',

		'&:hover': {
			borderColor: theme.colors.primary,

			'& p:first-of-type': {
				textDecoration: 'underline',
			},
		},
	},
});

const PostTitle = styled.p({
	fontSize: '1.2rem',
	fontWeight: 600,
});

const PostContet = styled.p(
	{
		marginTop: '15px',
	},
	ellipsis,
);

const PostInfoWrapper = styled.div({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	color: theme.colors.aboutLinkIcon,
	marginTop: '17px',
	fontSize: '.8rem',
});
