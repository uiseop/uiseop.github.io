import { theme } from './theme';
import styled from '@emotion/styled';
import { IconLookup, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tip from '@components/styles/components/Tip';
import { blind } from '@components/styles/blind';
import useToastModal from '@components/hooks/useToastModal';

type PasteButtonProps = {
	pasteWord: string;
};

const PASTE_MESSAEG = '복사 완료!';

const PasterButton = ({ pasteWord }: PasteButtonProps) => {
	const { setToastMessage } = useToastModal();

	const onClickHandler = () => {
		// console.log(pasteWord);
		setToastMessage(PASTE_MESSAEG);
	};

	return (
		<Button onClick={onClickHandler}>
			<FontAwesomeIcon icon={faCopy as IconLookup} height={30} />
			<Tip>복사하기</Tip>
		</Button>
		// {isVisible && Modla}
	);
};

const Button = styled.button(
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

export default PasterButton;
