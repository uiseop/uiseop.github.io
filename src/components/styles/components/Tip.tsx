import { theme } from '@components/common/theme';
import styled from '@emotion/styled';

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
	visibility: 'hidden',
	opacity: 0,
	zIndex: 1,

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

export default Tip;
