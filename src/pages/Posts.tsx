import { FunctionComponent } from 'react';
import Header from '@components/common/Header';
import styled from '@emotion/styled';
import { theme } from '@components/common/theme';
import { Link, NavLink } from 'react-router-dom';
import { ellipsis } from './../components/styles/ellipsis';

const Posts: FunctionComponent = () => {
	return (
		<>
			<Header />
			<Wrapper>
				<Navigation>
					<StyledLink to="/posts">ALL</StyledLink>
					<StyledLink to="all">React</StyledLink>
					<StyledLink to="all">Javascript</StyledLink>
					<StyledLink to="all">Browser</StyledLink>
					<StyledLink to="all">CS</StyledLink>
				</Navigation>
				<Main>
					<ul>
						<li>
							<Link to="/posts/1234">
								<PostTitle>About React</PostTitle>
								<PostContet>
									About ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
									ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
									ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
									ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
									ReactAbout ReactAbout ReactAbout ReactAbout ReactAbout
									ReactAbout ReactAbout ReactAbout React
								</PostContet>
							</Link>
						</li>
						<li>
							<Link to="/posts">About React</Link>
						</li>
					</ul>
				</Main>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div({
	marginTop: '60px',
	maxWidth: '720px',
	width: '100%',
	color: theme.colors.text,
});

const Navigation = styled.nav({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexWrap: 'nowrap',
});

const StyledLink = styled(NavLink)({
	color: theme.colors.tabText,
	fontWeight: 700,
	padding: '8px',
	borderRadius: '8px',

	'&.active': {
		backgroundColor: theme.colors.tabSelectedBackground,
		color: theme.colors.tabSelected,
	},
});

const Main = styled.main({
	marginTop: '15px',

	'& > ul': {
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

export default Posts;
