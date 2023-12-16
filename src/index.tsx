import ReactDOM from 'react-dom/client';
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root') as HTMLElement;
ReactDOM.hydrateRoot(
	container,
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>,
);
