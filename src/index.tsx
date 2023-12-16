import ReactDOM from 'react-dom/client';
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
ReactDOM.hydrateRoot(
	container,
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
