import {
	GlobalStyle,
	ThemeProvider,
	ThemeToggler,
	ToastContainer,
} from '@components/common';
import { Routes } from './Routes';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ga4 from 'react-ga4';

let init = false;

const App = () => {
	const location = useLocation();

	useEffect(() => {
		if (!init) {
			init = true;
			ga4.initialize('G-HZBWRN05E4');
		}

		return () => {
			init = false;
		};
	}, []);

	useEffect(() => {
		ga4.send({
			hitType: 'pageview',
			page: location.pathname,
		});
	}, [location]);

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
