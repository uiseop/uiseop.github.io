import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, MarkdownRednerer } from '@components/common';
import { files } from '@static/index';

const Post: FunctionComponent = () => {
	let { state, pathname } = useLocation();

	if (!state) {
		state = { markdown: files[parseInt(pathname.split('/')[2])].file };
	}

	return (
		<>
			<Header />
			<MarkdownRednerer markdown={state.markdown} />
		</>
	);
};

export default Post;
