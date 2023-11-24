import { FunctionComponent, useEffect, useState } from 'react';

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

	return <button onClick={toggleTheme}>Change to {nextTheme}</button>;
};

export default ThemeToggler;
