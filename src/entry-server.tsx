import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';

interface HelmetContextProps {
	helmet?: HelmetServerState;
}

export function render(url: string) {
	const helmetContext: HelmetContextProps = {};
	console.log(typeof url, 'helo');

	const html = ReactDOMServer.renderToString(
		<React.StrictMode>
			<HelmetProvider context={helmetContext}>
				<StaticRouter location={url}>
					<App />
				</StaticRouter>
			</HelmetProvider>
		</React.StrictMode>,
	);

	const { title, meta } = helmetContext.helmet || {};

	return { html, head: `${title}${meta}` };
}
