import Markdown from 'marked-react';
import { FunctionComponent } from 'react';
import markdown from '@static/test.md';

const Post: FunctionComponent = () => {
	return (
		<div>
			<Markdown>{markdown}</Markdown>
		</div>
	);
};

export default Post;
