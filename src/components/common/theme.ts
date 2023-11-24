type Theme = {
	colors: {
		primary: string;
		text: string;
		background: string;
	};
};

const cssVar = (str: string) => `var(--${str})`;

export const theme: Theme = {
	colors: {
		text: cssVar('colors-text'),
		primary: cssVar('colors-primary'),
		background: cssVar('colors-background'),
	},
};
