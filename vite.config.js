import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
// import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

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
				}),
			],
		},
	},
});
