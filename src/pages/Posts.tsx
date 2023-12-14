import styled from '@emotion/styled';
import { theme } from '@components/common/theme';
import { Navigationbar, PostList } from '@components/Posts';
import { Header } from '@components/common/Header';
import { categories, files } from '@static/index';

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
