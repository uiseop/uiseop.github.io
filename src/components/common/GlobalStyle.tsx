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
`;

const commonStyle = css`
	--colors-primary: rgb(76, 209, 55);
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

console.log(defaultStyle, 'haha');

export default GlobalStyle;
