import { theme } from '@components/common/theme';
import eStyled from '@emotion/styled';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

export const Navigationbar: FunctionComponent = () => {
	return (
		<Navigation>
			<StyledLink to="/posts">
				<CustomButton>ALL</CustomButton>
			</StyledLink>
			<StyledLink to="/posts/react">
				<CustomButton>React</CustomButton>
			</StyledLink>
			<StyledLink to="/posts/Javascript">
				<CustomButton>Javascript</CustomButton>
			</StyledLink>
			<StyledLink to="/posts/Browser">
				<CustomButton>Browser</CustomButton>
			</StyledLink>
			<StyledLink to="/posts/cs">
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
