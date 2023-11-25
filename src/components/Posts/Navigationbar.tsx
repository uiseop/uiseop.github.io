import { theme } from '@components/common/theme';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Navigationbar: FunctionComponent = () => {
	return (
		<Navigation>
			<StyledLink to="/posts">ALL</StyledLink>
			<StyledLink to="all">React</StyledLink>
			<StyledLink to="all">Javascript</StyledLink>
			<StyledLink to="all">Browser</StyledLink>
			<StyledLink to="all">CS</StyledLink>
		</Navigation>
	);
};

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

export default Navigationbar;
