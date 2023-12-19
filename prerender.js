// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');
const { filesInfo } = await import('./src/static/fileInfo.js');

// // determine routes to pre-render from src/pages
// const routesToPrerender = fs
// 	.readdirSync(toAbsolute('src/pages'))
// 	.map((file) => {
// 		const name = file.replace(/\.jsx$/, '').toLowerCase();
// 		return name === 'main' ? `/` : `/${name}`;
// 	});

const postIds = new Array(filesInfo.files.length)
	.fill(null)
	.map((_, idx) => `/${idx}`);

const routesToPrerender = ['/', '/about', '/posts', ...postIds];

(async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		const context = {};
		const appHtml = await render(url, context);

		const html = template
			.replace(`<!--app-html-->`, appHtml.html)
			.replace(`<!--app-head-->`, appHtml.head);

		const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
		fs.writeFileSync(toAbsolute(filePath), html);
		console.log('pre-rendered:', filePath);
	}
})();
