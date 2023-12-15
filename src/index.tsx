import ReactDOM from 'react-dom/client';
import App from './App';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const container = document.getElementById('root') as HTMLElement;
// const root = createRoot(container as Element);

// root.render(<App />);

ReactDOM.hydrateRoot(
	container,
	<React.StrictMode>
		<RouterProvider router={router} />
		<App />
	</React.StrictMode>,
);
