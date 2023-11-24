import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Template from '@components/common/Template';
import { theme } from '@components/common/theme';

const Main: FunctionComponent = () => {
	return (
		<Template>
			<header>
				<Title>CHUG ALONG</Title>
				<Author>by Seop_ee</Author>
			</header>
			<Navigation>
				<ul>
					<li>
						<StyledLink to={'/'}>HOME</StyledLink>
					</li>
					<li>
						<StyledLink to={'/about'}>ABOUT</StyledLink>
					</li>
					<li>
						<StyledLink to={'/posts'}>POSTS</StyledLink>
					</li>
				</ul>
			</Navigation>
		</Template>
	);
};

const Title = styled.h1({
	fontSize: '3rem',
	fontWeight: 700,
	color: theme.colors.text,
});

const Author = styled.span({
	color: theme.colors.primary,
	fontSize: '1.5rem',
	fontWeight: 600,
});

const Navigation = styled.nav({
	'& > ul': {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: '30px',

		'&::before': {
			content: '""',
			position: 'absolute',
			left: '-30px',
			top: '10px',
			bottom: '10px',
			borderLeft: `1px solid ${theme.colors.text}`,
		},
	},
});

const StyledLink = styled(NavLink)({
	color: theme.colors.text,
	position: 'relative',

	'&::after': {
		content: '""',
		backgroundColor: theme.colors.text,
		position: 'absolute',
		width: '13px',
		height: '1px',
		left: '-36px',
		top: '50%',
		transform: 'translateY(-50%)',
	},

	'&.active': {
		color: theme.colors.primary,

		'&::before': {
			content: '""',
			backgroundColor: theme.colors.primary,
			position: 'absolute',
			width: '13px',
			height: '13px',
			left: '-36px',
			top: '50%',
			transform: 'translateY(-50%)',
			zIndex: '1',
		},
	},
});

export default Main;
