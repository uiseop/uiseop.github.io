import { Helmet } from 'react-helmet-async';

interface SeoProps {
	title: string;
	description: string;
	author: string;
}

export const Seo = ({ title, description, author }: SeoProps) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta property="og:site_title" content={title} />
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />
			<meta property="og:author" content={author} />
			<meta property="og:type" content="website" />
			<meta
				name="google-site-verification"
				content="M3mi_tlJKeBDz4MW1IVV_C2qWh3-POV8_eID6k330qk"
			/>
		</Helmet>
	);
};
