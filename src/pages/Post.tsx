import { FunctionComponent } from 'react';
import markdown from '@static/test.md';
import MarkdownRednerer from '@components/common/MarkdownRenderer';
import Header from '@components/common/Header';

const Post: FunctionComponent = () => {
	return (
		<>
			<Header />
			<MarkdownRednerer markdown={markdown} />
		</>
	);
};

export default Post;
