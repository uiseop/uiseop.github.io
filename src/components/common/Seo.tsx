import { Helmet } from 'react-helmet';
import og_image from '@static/images/og-image.png';

interface SeoProps {
	title: string;
	description: string;
	author: string;
}

export const Seo = ({ title, description, author }: SeoProps) => {
	return (
		<Helmet
			htmlAttributes={{ lang: 'ko' }}
			title={title}
			meta={[
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:site_title`,
					content: title,
				},
				{
					name: `description`,
					content: description,
				},
				{
					property: `og:description`,
					content: description,
				},
				{
					property: 'og:author',
					content: author,
				},
				{
					property: 'og:image',
					content: og_image,
				},
				{
					property: `og:type`,
					content: `website`,
				},
			]}
		/>
	);
};
