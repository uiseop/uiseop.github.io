import { Routes as ReactRoutes, Route } from 'react-router-dom';
import Main from '@pages/Main';
import About from './pages/About';
import Posts from './pages/Posts';
import Post from '@pages/Post';
import { Template } from '@components/common';
import { files } from './static';

export const Routes = () => {
	return (
		<ReactRoutes>
			<Route path="/" Component={Template}>
				<Route index Component={Main} />
				<Route path="/about" Component={About} />
				{files.map((file) => {
					return (
						<Route
							key={file.data.urlTitle}
							path={`/${file.data.urlTitle}`}
							element={<Post file={file} />}
						/>
					);
				})}
				<Route path="/posts" Component={Posts}>
					<Route path=":category" Component={Posts} />
				</Route>
			</Route>
		</ReactRoutes>
	);
};
