import { Carousel } from '@components/common';
import { theme } from '@components/common/theme';
import eStyled from '@emotion/styled';
import { Button, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface NavigationbarProps {
	categories: string[];
}

export const Navigationbar = ({ categories }: NavigationbarProps) => {
	return (
		<Carousel>
			<Navigation>
				<StyledLink to="/posts" end draggable={false}>
					<CustomButton>ALL</CustomButton>
				</StyledLink>
				{categories.map((category) => (
					<StyledLink
						to={`/posts/${category}`}
						key={category}
						draggable={false}
					>
						<CustomButton>{category.toUpperCase()}</CustomButton>
					</StyledLink>
				))}
			</Navigation>
		</Carousel>
	);
};

const Navigation = eStyled.nav({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	flexWrap: 'nowrap',
	gap: '7px',
});

const CustomButton = styled(Button)({
	color: theme.colors.tabText,
	fontWeight: 700,

	'&:hover': {
		backgroundColor: theme.colors.aboutLinkIconHover,
	},
});

const StyledLink = eStyled(NavLink)({
	'&.active > button': {
		backgroundColor: theme.colors.tabSelectedBackground,
		color: theme.colors.tabSelected,
	},
});
