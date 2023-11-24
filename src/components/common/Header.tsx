import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { theme } from './theme';

const Header: FunctionComponent = () => {
	return (
		<Wrapper>
			<ContentWrapper>
				<Link to="/">CHUG ALONG</Link>
				<Navigation>
					<ul>
						<li>
							<StyledLink to="/">
								<span>HOME</span>
							</StyledLink>
						</li>
						<li>
							<StyledLink to="/about">
								<span>ABOUT</span>
							</StyledLink>
						</li>
						<li>
							<StyledLink to="/posts">
								<span>POSTS</span>
							</StyledLink>
						</li>
					</ul>
				</Navigation>
			</ContentWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.header({
	height: '60px',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const ContentWrapper = styled.div({
	maxWidth: '720px',
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',

	'& > a': {
		fontSize: '2rem',
		fontWeight: 'bold',
	},
});

const Navigation = styled.nav({
	position: 'relative',
	width: '200px',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'&::before': {
		content: '""',
		position: 'absolute',
		left: '25px',
		right: '25px',
		top: '50%',
		borderTop: `2px solid ${theme.colors.text}`,
	},

	'& > ul': {
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		top: '12px',

		'& > li': {
			position: 'relative',
			width: '50px',

			'&::after': {
				content: '""',
				borderLeft: `1px solid ${theme.colors.text}`,
				position: 'absolute',
				width: '1px',
				height: '13px',
				left: '50%',
				top: '-17px',
				transform: 'translateX(-50%)',
			},

			'& span': {
				position: 'absolute',
				transition: 'opacity 0.5s ease-in-out;',
				opacity: 0,

				'&:hover': {
					color: theme.colors.primary,
				},
			},
		},
	},

	'&:hover': {
		'& span': {
			opacity: 1,
		},
	},
});

const StyledLink = styled(NavLink)({
	color: theme.colors.text,

	'&.active': {
		color: theme.colors.primary,

		'&::before': {
			content: '""',
			backgroundColor: theme.colors.primary,
			position: 'absolute',
			width: '13px',
			height: '13px',
			left: '50%',
			top: '-17px',
			transform: 'translateX(-50%)',
			zIndex: 1,
		},
	},
});

export default Header;
