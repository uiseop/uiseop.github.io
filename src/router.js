import { createBrowserRouter } from 'react-router-dom';
import Main from '@pages/Main';
import About from './pages/About';
import Posts from './pages/Posts';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/about',
		element: <About />,
	},
	{
		path: '/posts',
		element: <Posts />,
	},
]);
