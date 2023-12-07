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
		tabText: string;
		tabSelected: string;
		tabSelectedBackground: string;
		postCardBorder: string;
		blockquoteBackground: string;
		contentText: string;
		blockquoteBorder: string;
		paste: string;
		pasteHover: string;
	};
};

const cssVar = (str: string) => `var(--colors-${str})`;

export const theme: Theme = {
	colors: {
		text: cssVar('text'),
		primary: cssVar('primary'),
		background: cssVar('background'),
		background2: cssVar('background2'),
		anchor: cssVar('anchor'),
		secondaryText: cssVar('secondary-text'),
		aboutLinkIcon: cssVar('about-link-icon'),
		aboutLinkIconHover: cssVar('about-link-icon-hover'),
		tipBackground: cssVar('tip-background'),
		tabText: cssVar('tab-text'),
		tabSelected: cssVar('tab-selected'),
		tabSelectedBackground: cssVar('tab-selected-background'),
		postCardBorder: cssVar('post-card-border'),
		blockquoteBackground: cssVar('blockquote-background'),
		contentText: cssVar('content-text'),
		blockquoteBorder: cssVar('blockquote-border'),
		paste: cssVar('paste'),
		pasteHover: cssVar('paste-hover'),
	},
};
