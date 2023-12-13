import { ThemeContext } from '@components/common/ThemeProvider';
import { useContext } from 'react';

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (context === null) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
};
