import { theme } from '@components/common/theme';
import { useHorizontalScroll } from '@components/hooks';
import eStyled from '@emotion/styled';
import { Button, styled } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';

interface NavigationbarProps {
	categories: string[];
}

export const Navigationbar = ({ categories }: NavigationbarProps) => {
	const { category } = useParams();
	const navRef = useHorizontalScroll(category);

	return (
		<Navigation ref={navRef}>
			<StyledLink to="/posts" end draggable={false}>
				<CustomButton>ALL</CustomButton>
			</StyledLink>
			{categories.map((category) => (
				<StyledLink to={`/posts/${category}`} key={category} draggable={false}>
					<CustomButton value={category}>{category.toUpperCase()}</CustomButton>
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
	width: '100%',

	// 가로 Scroll 허용 css
	overflowX: 'auto',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
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
