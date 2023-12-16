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
		<React.StrictMode>
			<ThemeProvider>
				<GlobalStyle />
				<Routes />
				<ThemeToggler />
				<ToastContainer />
			</ThemeProvider>
		</React.StrictMode>
	);
};

export default App;
