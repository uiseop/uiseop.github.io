import {
	GlobalStyle,
	ThemeProvider,
	ThemeToggler,
	ToastContainer,
} from '@components/common';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
	return (
		<React.StrictMode>
			<ThemeProvider>
				<GlobalStyle />
				<RouterProvider router={router} />
				<ThemeToggler />
				<ToastContainer />
			</ThemeProvider>
		</React.StrictMode>
	);
};

export default App;
