import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Main from '@pages/Main';
import About from './pages/About';
import Posts from './pages/Posts';
import Post from '@pages/Post';
import { Template } from '@components/common';

const postRouter: RouteObject = {
	path: 'posts',
	children: [
		{
			index: true,
			element: <Posts />,
		},
		{
			path: ':category',
			element: <Posts />,
		},
	],
};

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Template />,
			children: [
				{
					index: true,
					element: <Main />,
				},
				{
					path: 'about',
					element: <About />,
				},
				{
					path: ':postId',
					element: <Post />,
				},
				postRouter,
			],
		},
	],
	{
		basename: '/',
	},
);
