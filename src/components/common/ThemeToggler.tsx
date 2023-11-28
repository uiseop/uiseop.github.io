import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { theme } from './theme';
import useTheme from '@components/hooks/useTheme';
import { ThemeType } from './ThemeProvider';

const ThemeToggler: FunctionComponent = () => {
	const { theme, setTheme } = useTheme();
	const nextTheme: ThemeType = theme === 'light' ? 'dark' : 'light';

	const toggleTheme = () => {
		setTheme(nextTheme);
	};

	return (
		<Button onClick={toggleTheme}>
			{theme === 'light' ? (
				<FontAwesomeIcon icon={faMoon} />
			) : (
				<FontAwesomeIcon icon={faSun} />
			)}
		</Button>
	);
};

const Button = styled.button({
	position: 'fixed',
	right: '30px',
	bottom: '30px',
	width: '60px',
	height: '60px',
	borderRadius: '50%',
	border: 'none',
	fontSize: '2rem',
	color: theme.colors.text,
	backgroundColor: theme.colors.background2,
	cursor: 'pointer',
});

export default ThemeToggler;
