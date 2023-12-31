import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin'],
			},
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
		target: 'esnext',
		rollupOptions: {
			plugins: [rollupNodePolyFill()],
		},
	},
	ssr: {
		noExternal: ['react-helmet-async'],
	},
});
