import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Template from '@components/common/Template';
import Header from '@components/common/Header';
import { theme } from '@components/common/theme';
import Description from '@components/About/Description';
import SocialLinks from '@components/About/SocialLinks';

const About: FunctionComponent = () => {
	return (
		<Template>
			<Header />
			<Wrapper>
				<Description />
				<SocialLinks />
			</Wrapper>
		</Template>
	);
};

const Wrapper = styled.main({
	width: '100%',
	maxWidth: '720px',
	margin: '120px 0',
	display: 'flex',
	flexDirection: 'column',
	fontSize: '2.5rem',
	fontWeight: 300,
	color: theme.colors.text,
});

export default About;
