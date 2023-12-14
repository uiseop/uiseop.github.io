import styled from '@emotion/styled';
import { theme } from '@components/common/theme';
import { Navigationbar, PostList } from '@components/Posts';
import { Header } from '@components/common/Header';
import { files } from '@static/index';
import { CustomGrayMatterFile } from '@components/common';
import matter from 'gray-matter';

let categorySet = new Set<string>();
let categories: string[];

function handleCategories() {
	files.forEach(({ file }) => {
		const { data } = matter(file) as CustomGrayMatterFile;
		data.categories.forEach((category) => categorySet.add(category));
	});

	categories = Array.from(categorySet);
}

handleCategories();

const Posts = () => {
	return (
		<>
			<Header />
			<Wrapper>
				<Navigationbar categories={categories} />
				<Main>
					<PostList files={files} />
				</Main>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div({
	marginTop: '60px',
	maxWidth: '720px',
	width: '100%',
	color: theme.colors.text,
});

const Main = styled.main({
	marginTop: '15px',
});

export default Posts;
