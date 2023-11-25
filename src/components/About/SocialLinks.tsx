import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { theme } from '@components/common/theme';
import { blind } from '@components/styles/blind';
import styled from '@emotion/styled';

const SocialLinks: FunctionComponent = () => {
	return (
		<ListWrapper>
			<li>
				<StlyedAnchor target="blank" href="https://github.com/uiseop">
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
	);
};

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

export default SocialLinks;
