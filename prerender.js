// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);
const postsDir = path.join(__dirname, './dist/static/posts');

fs.mkdirSync(postsDir, { recursive: true });

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');
const { filesInfo } = await import('./src/static/fileInfo.js');

const postTitles = filesInfo.files.map((file) => {
	const { data } = matter(file);
	return `/${data.urlTitle}`;
});

const categories = filesInfo.categories.map((category) => `/posts/${category}`);

const routesToPrerender = [
	'/',
	'/about',
	'/posts',
	...postTitles,
	...categories,
];

(async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		try {
			const context = {};
			const appHtml = await render(url, context);

			const html = template
				.replace(`<!--app-html-->`, appHtml.html)
				.replace(`<!--app-head-->`, appHtml.head);

			const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
			fs.writeFileSync(toAbsolute(filePath), html);
			console.log('pre-rendered:', filePath);
		} catch (err) {
			console.log(err);
		}
	}
})();

// Generate XML for sitemap
const generateSitemapXml = (urls) => {
	const date = new Date().toISOString();
	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

	urls.forEach((url) => {
		xml += `<url><loc>https://uiseop.github.io${url}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
	});

	xml += `</urlset>`;
	return xml;
};

// Generate sitemap XML content
const sitemapXml = generateSitemapXml(routesToPrerender);

// Write sitemap.xml file
fs.writeFileSync(toAbsolute('dist/static/sitemap.xml'), sitemapXml);
