import {
	GlobalStyle,
	ThemeProvider,
	ThemeToggler,
	ToastContainer,
} from '@components/common';
import { Routes } from './routes';
import React from 'react';

const App = () => {
	return (
		<ThemeProvider>
			<GlobalStyle />
			<Routes />
			<ThemeToggler />
			<ToastContainer />
		</ThemeProvider>
	);
};

export default App;
