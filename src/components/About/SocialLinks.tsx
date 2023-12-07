import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { theme } from '@components/common/theme';
import { blind } from '@components/styles/blind';
import styled from '@emotion/styled';
import Tip from '@components/styles/components/Tip';

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
			visibility: 'visible',
			opacity: 1,
		},
	},

	'& > svg': {
		height: '30px',
	},

	'& > span': { ...blind },
});

export default SocialLinks;
