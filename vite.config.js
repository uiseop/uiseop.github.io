import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { join, parse, resolve } from 'path';
// import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
// import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

function entryPoints(...paths) {
	const entries = paths.map(parse).map((entry) => {
		const { dir, base, name } = entry;
		const key = join(dir, name);
		const path = resolve(__dirname, dir, base);
		return [key, path];
	});

	const config = Object.fromEntries(entries);
	return config;
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			// babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
		}),
		{
			name: 'markdown-loader',
			transform(code, id) {
				if (id.slice(-3) === '.md') {
					// For .md files, get the raw content
					return `export default ${JSON.stringify(code)};`;
				}
			},
		},
	],
	resolve: {
		alias: [
			{ find: '@components', replacement: '/src/components' },
			{ find: '@hooks', replacement: '/src/hooks' },
			{ find: '@pages', replacement: '/src/pages' },
			{ find: '@utils', replacement: '/src/utils' },
			{ find: '@static', replacement: '/src/static' },
			{ find: '@atom', replacement: '/src/atom' },
			{ find: '@core', replacement: '/src/core' },
		],
	},
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis',
			},
			// Enable esbuild polyfill plugins
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
					process: true,
				}),
				NodeModulesPolyfillPlugin(),
			],
		},
	},
	build: {
		rollupOptions: {
			input: entryPoints('index.html', '404.html'),
			plugins: [rollupNodePolyFill()],
		},
	},
});
