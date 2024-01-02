import {
	CustomGrayMatterFile,
	Header,
	MarkdownRednerer,
} from '@components/common';
import { Seo } from '@components/common/Seo';

interface PostProps {
	file: CustomGrayMatterFile;
}

const Post = ({ file }: PostProps) => {
	const { data, content } = file;
	return (
		<>
			<Seo title={data.title} description={data.summary} author={data.author} />
			<Header />
			<MarkdownRednerer content={content} data={data} />
		</>
	);
};

export default Post;
