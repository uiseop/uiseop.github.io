import { Global, css } from '@emotion/react';
import { FunctionComponent } from 'react';

const GlobalStyle: FunctionComponent = () => {
	return <Global styles={defaultStyle} />;
};

const resetStyle = css`
	/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
	blockquote,
	body,
	dd,
	dl,
	dt,
	fieldset,
	figure,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	html,
	iframe,
	legend,
	li,
	ol,
	p,
	pre,
	textarea,
	ul {
		margin: 0;
		padding: 0;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 100%;
		font-weight: 400;
	}
	ul {
		list-style: none;
	}
	button,
	input,
	select {
		margin: 0;
	}
	html {
		box-sizing: border-box;
	}
	*,
	:after,
	:before {
		box-sizing: inherit;
	}
	img,
	video {
		height: auto;
		max-width: 100%;
	}
	iframe {
		border: 0;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	td,
	th {
		padding: 0;
	}
	a {
		text-decoration: none;
		color: var(--colors-text);
	}
`;

const commonStyle = css`
	:root {
		--colors-primary: rgb(76, 209, 55);
		--colors-background2: rgb(113, 128, 147);
		--colors-anchor: rgb(0, 168, 255);
	}
`;

const lightStlye = css`
	body[data-theme='light'] {
		--colors-text: black;
		--colors-background: white;
	}
`;

const darkStyle = css`
	body[data-theme='dark'] {
		--colors-text: white;
		--colors-background: black;
	}
`;

const defaultStyle = css`
	${resetStyle};
	${commonStyle};
	${lightStlye};
	${darkStyle};
`;

export default GlobalStyle;
