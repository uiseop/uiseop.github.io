import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, MarkdownRednerer } from '@components/common';

const Post: FunctionComponent = () => {
	const { state } = useLocation();
	return (
		<>
			<Header />
			<MarkdownRednerer markdown={state.markdown} />
		</>
	);
};

export default Post;
