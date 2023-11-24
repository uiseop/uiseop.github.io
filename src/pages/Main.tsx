import ThemeToggler from '@components/common/ThemeToggler';
import { theme } from '@components/common/theme';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';

const Main: FunctionComponent = () => {
	return (
		<div>
			<PrimaryText>Hello React!</PrimaryText>
			<ThemeToggler />
		</div>
	);
};

const PrimaryText = styled.div({
	padding: 20,
	color: theme.colors.text,
	backgroundColor: theme.colors.background,
});

export default Main;
