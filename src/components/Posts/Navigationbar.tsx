import { theme } from '@components/common/theme';
import eStyled from '@emotion/styled';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Navigationbar: FunctionComponent = () => {
	return (
		<Navigation>
			<StyledLink to="/posts">
				<CustomButton>ALL</CustomButton>
			</StyledLink>
			<StyledLink to="all">
				<CustomButton>React</CustomButton>
			</StyledLink>
			<StyledLink to="all">
				<CustomButton>Javascript</CustomButton>
			</StyledLink>
			<StyledLink to="all">
				<CustomButton>Browser</CustomButton>
			</StyledLink>
			<StyledLink to="all">
				<CustomButton>CS</CustomButton>
			</StyledLink>
		</Navigation>
	);
};

const Navigation = eStyled.nav({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexWrap: 'nowrap',
});

const CustomButton = styled(Button)({
	color: theme.colors.tabText,
	fontWeight: 700,
});

const StyledLink = eStyled(NavLink)({
	'&.active > button': {
		backgroundColor: theme.colors.tabSelectedBackground,
		color: theme.colors.tabSelected,
	},
});

export default Navigationbar;
