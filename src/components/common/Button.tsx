import { theme } from './theme';
import styled from '@emotion/styled';
import { IconLookup, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tip from '@components/styles/components/Tip';
import { blind } from '@components/styles/blind';

type ButtonProps = {
	content: string;
	onClick: () => void;
};

export const Button = ({ content, onClick }: ButtonProps) => {
	function handleClick() {
		onClick();
	}

	return (
		<CustonButton onClick={handleClick}>
			<FontAwesomeIcon icon={faCopy as IconLookup} height={30} />
			<Tip>{content}</Tip>
		</CustonButton>
	);
};

const CustonButton = styled.button(
	{
		position: 'absolute',
		zIndex: 1,
		right: 0,
		width: '30px',
		height: '30px',
		backgroundColor: 'transparent',
		border: 'none',
		color: theme.colors.paste,
		transition: 'color 0.5s',
		cursor: 'pointer',

		'&:hover': {
			color: 'white',

			'& div': {
				visibility: 'visible',
				opacity: 1,
			},
		},
	},
	{ blind },
);
