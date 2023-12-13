import React, { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import GlobalStyle from '@components/common/GlobalStyle';
import ThemeToggler from '@components/common/ThemeToggler';
import ThemeProvider from '@components/common/ThemeProvider';
import Modal from '@components/common/ToastModal';

const App: FunctionComponent = () => {
	return (
		<React.StrictMode>
			<ThemeProvider>
				<GlobalStyle />
				<RouterProvider router={router} />
				<ThemeToggler />
				<Modal />
			</ThemeProvider>
		</React.StrictMode>
	);
};

export default App;
