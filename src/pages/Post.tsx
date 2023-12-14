import { useLocation, useParams } from 'react-router-dom';
import { Header, MarkdownRednerer } from '@components/common';
import { files } from '@static/index';

const Post = () => {
	let { state } = useLocation();

	if (!state) {
		const { postId } = useParams();
		state = { markdown: files[parseInt(postId!)].file };
	}

	return (
		<>
			<Header />
			<MarkdownRednerer markdown={state.markdown} />
		</>
	);
};

export default Post;
