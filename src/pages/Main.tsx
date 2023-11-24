import ThemeToggler from '@components/common/ThemeToggler';
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
	color: 'var(--colors-primary)',
	backgroundColor: 'var(--colors-background)',
});

export default Main;
