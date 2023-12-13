import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { theme } from '@components/common/theme';
import { Description, SocialLinks } from '@components/About';
import { Header } from '@components/common';

const About: FunctionComponent = () => {
	return (
		<>
			<Header />
			<Wrapper>
				<Description />
				<SocialLinks />
			</Wrapper>
		</>
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
