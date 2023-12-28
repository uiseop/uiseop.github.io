import { useLocation, useParams } from 'react-router-dom';
import {
	CustomGrayMatterFile,
	Header,
	MarkdownRednerer,
} from '@components/common';
import { files } from '@static/index';
import { Seo } from '@components/common/Seo';
import matter from 'gray-matter';

const Post = () => {
	let { state } = useLocation();

	if (!state) {
		const { postTitle } = useParams();
		state = { markdown: files[parseInt(postTitle!)] };
	}

	const { data } = matter(state.markdown) as CustomGrayMatterFile;

	return (
		<>
			<Seo title={data.title} description={data.summary} author={data.author} />
			<Header />
			<MarkdownRednerer markdown={state.markdown} />
		</>
	);
};

export default Post;
