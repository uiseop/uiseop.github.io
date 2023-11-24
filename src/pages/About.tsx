import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import Template from '@components/common/Template';
import Header from '@components/common/Header';
import { theme } from '@components/common/theme';
import Description from '@components/About/Description';
import { blind } from './../components/styles/blind';

const About: FunctionComponent = () => {
	return (
		<Template>
			<Header />
			<Wrapper>
				<Description />
				<ListWrapper>
					<li>
						<StlyedAnchor href="https://github.com/uiseop">
							<FontAwesomeIcon width={30} icon={faGithub} />
							<span>github</span>
						</StlyedAnchor>
						<Tip>github</Tip>
					</li>
					<li>
						<StlyedAnchor href="mailto:bono521@naver.com">
							<FontAwesomeIcon width={30} icon={faAt} />
							<span>github</span>
						</StlyedAnchor>
						<Tip>email</Tip>
					</li>
				</ListWrapper>
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

const ListWrapper = styled.ul({
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	marginTop: '14px',
	gap: '6px',

	'& > li': {
		position: 'relative',
	},
});

const StlyedAnchor = styled.a({
	display: 'flex',
	padding: '5px',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '50%',
	color: theme.colors.aboutLinkIcon,
	transition: 'background-color 0.4s ease',

	'&:hover': {
		backgroundColor: theme.colors.aboutLinkIconHover,

		'& + div': {
			opacity: 1,
		},
	},

	'& > svg': {
		height: '30px',
	},

	'& > span': { ...blind },
});

const Tip = styled.div({
	position: 'absolute',
	bottom: '-37px',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '6px',
	borderRadius: '4px',
	backgroundColor: theme.colors.tipBackground,
	fontSize: '.6rem',
	fontWeight: 600,
	color: 'white',
	transition: 'opacity 0.3s ease-in-out',
	opacity: 0,

	'&::before': {
		content: '""',
		position: 'absolute',
		top: '-5px',
		left: '50%',
		width: '6px',
		height: '6px',
		backgroundColor: theme.colors.tipBackground,
		transform: 'rotate(45deg) translateY(50%)',
	},
});

export default About;
