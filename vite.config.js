import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
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
		],
	},
});
