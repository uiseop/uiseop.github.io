import { useEnhancedEffect } from '@components/hooks';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useMemo,
	useState,
} from 'react';

export type ThemeType = 'light' | 'dark';

interface ThemeContextType {
	theme: ThemeType;
	setTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ThemeType>('light');

	useEnhancedEffect(() => {
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
