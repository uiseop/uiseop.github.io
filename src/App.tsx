import React, { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import GlobalStyle from '@components/common/GlobalStyle';

const App: FunctionComponent = () => {
	return (
		<React.StrictMode>
			<GlobalStyle />
			<RouterProvider router={router} />
		</React.StrictMode>
	);
};

export default App;
