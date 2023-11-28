import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';

export type ThemeType = 'light' | 'dark';

interface ThemeContextType {
	theme: ThemeType;
	setTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ThemeType>('light');

	useLayoutEffect(() => {
		document.body.dataset.theme = theme;
	}, [theme]);

	const value: ThemeContextType = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export default ThemeProvider;
