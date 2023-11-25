import React, { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import GlobalStyle from '@components/common/GlobalStyle';
import ThemeToggler from '@components/common/ThemeToggler';

const App: FunctionComponent = () => {
	return (
		<React.StrictMode>
			<GlobalStyle />
			<RouterProvider router={router} />
			<ThemeToggler />
		</React.StrictMode>
	);
};

export default App;
