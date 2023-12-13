import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { theme } from '@components/common/theme';
import { Navigationbar, PostList } from '@components/Posts';
import { Header } from '@components/common/Header';

const Posts: FunctionComponent = () => {
	return (
		<>
			<Header />
			<Wrapper>
				<Navigationbar />
				<Main>
					<PostList />
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
