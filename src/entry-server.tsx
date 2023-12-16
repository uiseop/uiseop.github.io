import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

export function render(url: string) {
	const html = ReactDOMServer.renderToString(
		<React.StrictMode>
			<HelmetProvider context={helmetContext}>
				<StaticRouter location={url}>
					<App />
				</StaticRouter>
			</HelmetProvider>
		</React.StrictMode>,
	);
	return { html };
}
