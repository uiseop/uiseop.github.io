import { FunctionComponent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { theme } from './theme';

type Theme = 'light' | 'dark';

const ThemeToggler: FunctionComponent = () => {
	const [theme, setTheme] = useState<Theme>('light');
	const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';

	useEffect(() => {
		document.body.dataset.theme = theme;
	}, [theme]);

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
	position: 'absolute',
	right: '30px',
	bottom: '15px',
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
