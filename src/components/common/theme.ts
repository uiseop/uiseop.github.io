type Theme = {
	colors: {
		primary: string;
		text: string;
		background: string;
		background2: string;
		anchor: string;
		secondaryText: string;
		aboutLinkIcon: string;
		aboutLinkIconHover: string;
		tipBackground: string;
	};
};

const cssVar = (str: string) => `var(--${str})`;

export const theme: Theme = {
	colors: {
		text: cssVar('colors-text'),
		primary: cssVar('colors-primary'),
		background: cssVar('colors-background'),
		background2: cssVar('colors-background2'),
		anchor: cssVar('colors-anchor'),
		secondaryText: cssVar('colors-secondary-text'),
		aboutLinkIcon: cssVar('colors-about-link-icon'),
		aboutLinkIconHover: cssVar('colors-about-link-icon-hover'),
		tipBackground: cssVar('colors-tip-background'),
	},
};
