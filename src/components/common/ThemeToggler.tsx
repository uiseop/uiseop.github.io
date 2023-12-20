import { animated, useTransition } from 'react-spring';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { theme } from './theme';
import { ThemeType } from './ThemeProvider';
import { useTheme } from '@components/hooks';

export const ThemeToggler = () => {
	const { theme, setTheme } = useTheme();
	const nextTheme: ThemeType = theme === 'light' ? 'dark' : 'light';

	function toggleTheme() {
		setTheme(nextTheme);
	}

	const isDark = theme === 'dark';

	const transitions = useTransition(isDark, {
		initial: {
			transform: 'scale(1) rotate(0deg)',
			opacity: 1,
		},
		from: {
			transform: 'scale(0) rotate(-180deg)',
			opacity: 0,
		},
		enter: {
			transform: 'scale(1) rotate(0deg)',
			opacity: 1,
		},
		leave: {
			transform: 'scale(0) rotate(180deg)',
			opacity: 0,
		},

		reverse: true,
	});

	return (
		<Button onClick={toggleTheme}>
			{transitions((style, item) =>
				item ? (
					<Positioner>
						<AnimatedWrapper style={style}>
							<FontAwesomeIcon icon={faMoon} />
						</AnimatedWrapper>
					</Positioner>
				) : (
					<Positioner>
						<AnimatedWrapper style={style}>
							<FontAwesomeIcon icon={faSun} />
						</AnimatedWrapper>
					</Positioner>
				),
			)}
		</Button>
	);
};

const Button = styled.button({
	position: 'fixed',
	right: '30px',
	bottom: '30px',
	width: '50px',
	height: '50px',
	borderRadius: '50%',
	border: 'none',
	fontSize: '27px',
	color: theme.colors.text,
	backgroundColor: theme.colors.background2,
	cursor: 'pointer',
	zIndex: 1,
});

const Positioner = styled.div({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
});

const AnimatedWrapper = animated('div');
