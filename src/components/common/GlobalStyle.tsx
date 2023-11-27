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
		--colors-secondary-text: #9e9e9e;

		--colors-about-link-icon-hover: rgba(0, 0, 0, 0.06);
		--colors-tip-background: #939393;
		--colors-blockquote-background: #fafbfc2b;
	}

	/* 스크롤바의 폭 너비 */
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: #6666666a; /* 스크롤바 색상 */
		border-radius: 10px; /* 스크롤바 둥근 테두리 */
	}

	::-webkit-scrollbar-track {
		background: #ddd; /*스크롤바 뒷 배경 색상*/
	}
`;

const lightStlye = css`
	body[data-theme='light'] {
		--colors-text: black;
		--colors-background: white;
		--colors-about-link-icon: #a8a8a8;
		--colors-tab-text: #6e6d7a;
		--colors-tab-selected: #0d0c22;
		--colors-tab-selected-background: rgba(13, 12, 34, 0.05);
		--colors-post-card-border: rgba(0, 0, 0, 0.12);
		--colors-blockquote-border: rgba(255, 92, 0, 0.7);
		--colors-content-text: #37352f;
	}
`;

const darkStyle = css`
	body[data-theme='dark'] {
		--colors-text: white;
		--colors-background: black;
		--colors-about-link-icon: white;
		--colors-tab-text: #768390;
		--colors-tab-selected: #acbac7;
		--colors-tab-selected-background: #373e47;
		--colors-post-card-border: #363f47;
		--colors-blockquote-border: #ff5c00;
		--colors-content-text: #e6e6e6;
	}
`;

const defaultStyle = css`
	${resetStyle};
	${commonStyle};
	${lightStlye};
	${darkStyle};
`;

export default GlobalStyle;
