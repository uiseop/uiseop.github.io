import { createBrowserRouter } from 'react-router-dom';
import Main from '@pages/Main';
import About from './pages/About';
import Posts from './pages/Posts';
import Template from './components/common/Template';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Template />,
		children: [
			{
				index: true,
				element: <Main />,
				label: 'main',
			},
			{
				path: '/about',
				element: <About />,
				label: 'about',
			},
			{
				path: '/posts',
				element: <Posts />,
				label: 'posts',
			},
		],
	},
]);
