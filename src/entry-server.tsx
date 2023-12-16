import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { StaticRouter } from 'react-router-dom/server';
import ReactHelmet from 'react-helmet-async';

const helmetContext = {};

export function render(url: string) {
	const html = ReactDOMServer.renderToString(
		<React.StrictMode>
			<ReactHelmet.HelmetProvider context={helmetContext}>
				<StaticRouter location={url}>
					<App />
				</StaticRouter>
			</ReactHelmet.HelmetProvider>
		</React.StrictMode>,
	);
	return { html };
}
