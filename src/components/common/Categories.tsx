import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import { theme } from './theme';
import { Link } from 'react-router-dom';

type CategoriesProps = {
	categories: string[];
};

const Categories: FunctionComponent<CategoriesProps> = ({ categories }) => {
	return (
		<Wrapper>
			{categories.map((category) => {
				return (
					<li key={category}>
						<Link to={`/posts/${category}`}>
							{category.toLocaleUpperCase()}
						</Link>
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
	color: theme.colors.text,
	fontSize: '.8rem',
	fontWeight: 600,
	boxSizing: 'content-box',

	'& li:hover': {
		position: 'relative',

		'&::before': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `2px solid ${theme.colors.text}`,
		},
	},
});

export default Categories;
