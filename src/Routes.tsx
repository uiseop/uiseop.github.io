import { Routes as ReactRoutes, Route } from 'react-router-dom';
import Main from '@pages/Main';
import About from './pages/About';
import Posts from './pages/Posts';
import Post from '@pages/Post';
import { Template } from '@components/common';

export const Routes = () => {
	return (
		<ReactRoutes>
			<Route path="/" Component={Template}>
				<Route index Component={Main} />
				<Route path="/about" Component={About} />
				<Route path="/:postId" Component={Post} />
				<Route path="/posts" Component={Posts} />
			</Route>
		</ReactRoutes>
	);
};
