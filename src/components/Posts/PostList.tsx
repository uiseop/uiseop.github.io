import { theme } from '@components/common/theme';
import { ellipsis } from '@components/styles/ellipsis';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const PostList = () => {
	return (
		<Wrapper>
			<li>
				<Link to="/posts/1234">
					<PostTitle>About React</PostTitle>
					<PostContet>
						About ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
						ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
						ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
						ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
						ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout React
					</PostContet>
					<PostInfoWrapper>
						hello wolrd
						<CategoryWrapper>
							<li>React</li>
							<li>Javascript</li>
						</CategoryWrapper>
					</PostInfoWrapper>
				</Link>
			</li>
			<li>
				<Link to="/posts">About React</Link>
			</li>
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

const CategoryWrapper = styled.ul({
	display: 'flex',
	gap: '6px',
});

export default PostList;
