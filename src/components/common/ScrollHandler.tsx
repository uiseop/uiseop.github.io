import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollHandler = () => {
	const location = useLocation();

	useEffect(() => {
		const savedScrollPosition = localStorage.getItem(
			`scrollPosition-${location.pathname}`,
		);
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		} else {
			window.scrollTo(0, 0);
		}
		const handleScroll = () => {
			localStorage.setItem(
				`scrollPosition-${location.pathname}`,
				window.scrollY.toString(),
			);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [location.pathname]);

	return null;
};
