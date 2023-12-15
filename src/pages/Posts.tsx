import styled from '@emotion/styled';
import { theme } from '@components/common/theme';
import { Navigationbar, PostList } from '@components/Posts';
import { Header } from '@components/common/Header';
import { categories, files } from '@static/index';
import { Seo } from '@components/common/Seo';

const Posts = () => {
	return (
		<>
			<Seo title="Posts" description="섭이의 개발 블로그" author="uiseop" />
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
