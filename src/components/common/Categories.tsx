import styled from '@emotion/styled';
import { theme } from './theme';
import { Link } from 'react-router-dom';

type CategoriesProps = {
	categories: string[];
	withLink?: boolean;
};

export const Categories = ({
	categories,
	withLink = false,
}: CategoriesProps) => {
	return (
		<Wrapper>
			{categories.map((category) => {
				return (
					<li key={category}>
						{withLink ? (
							<Link to={`/posts/${category}`}>
								{category.toLocaleUpperCase()}
							</Link>
						) : (
							category.toLocaleUpperCase()
						)}
					</li>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.ul({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '4px',
	boxSizing: 'content-box',
	zIndex: 1,
	flexWrap: 'wrap',

	'& li:hover': {
		position: 'relative',

		'& a::before': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `2px solid ${theme.colors.text}`,
		},
	},
});
