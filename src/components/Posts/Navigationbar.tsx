import { theme } from '@components/common/theme';
import eStyled from '@emotion/styled';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface NavigationbarProps {
	categories: string[];
}

export const Navigationbar = ({ categories }: NavigationbarProps) => {
	return (
		<Navigation>
			<StyledLink to="/posts" end>
				<CustomButton>ALL</CustomButton>
			</StyledLink>
			{categories.map((category) => (
				<StyledLink to={`/posts/${category}`} key={category}>
					<CustomButton>{category.toUpperCase()}</CustomButton>
				</StyledLink>
			))}
		</Navigation>
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
