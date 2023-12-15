import {
	GlobalStyle,
	ThemeProvider,
	ThemeToggler,
	ToastContainer,
} from '@components/common';
import React from 'react';

const App = () => {
	return (
		<ThemeProvider>
			<GlobalStyle />
			<ThemeToggler />
			<ToastContainer />
		</ThemeProvider>
	);
};

export default App;
