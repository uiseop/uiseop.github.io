import { FunctionComponent } from 'react';
import Template from '@components/common/Template';
import Header from '@components/common/Header';
import styled from '@emotion/styled';
import { theme } from '@components/common/theme';
import Description from '@components/About/Description';

const About: FunctionComponent = () => {
	return (
		<Template>
			<Header />
			<Wrapper>
				<Description />
			</Wrapper>
		</Template>
	);
};

const Wrapper = styled.main({
	width: '100%',
	maxWidth: '720px',
	margin: '120px 0',
	display: 'flex',
	fontSize: '2.5rem',
	fontWeight: 300,
	color: theme.colors.text,
});

export default About;
