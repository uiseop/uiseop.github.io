import { Global, css } from '@emotion/react';
import { FunctionComponent } from 'react';

const GlobalStyle: FunctionComponent = () => {
	return <Global styles={defaultStyle} />;
};

const prism = css`
	code,
	code[class*='language-'],
	pre[class*='language-'] {
		color: #24292e;
	}
	pre {
		color: #24292e;
		background: #f6f8fa;
	}
	.token.function {
		color: #005cc5;
	}
	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: #969896;
	}
	.token.punctuation {
		color: #24292e;
	}
	.token.string {
		color: #032f62;
	}
	.token.atrule,
	.token.attr-value {
		color: #183691;
	}
	.token.property,
	.token.tag {
		color: #63a35c;
	}
	.token.boolean,
	.token.number {
		color: #0086b3;
	}
	.token.selector,
	.token.attr-name,
	.token.attr-value .punctuation:first-child,
	.token.keyword,
	.token.regex,
	.token.important {
		color: #d73a49;
	}
	.token.operator,
	.token.entity,
	.token.url,
	.language-css {
		color: #d73a49;
	}
	.token.entity {
		cursor: help;
	}
	.namespace {
		opacity: 0.7;
	}
`;

const dark = css`
	code[class*='language-'],
	pre[class*='language-'] {
		color: #ccc;
		background: rgb(40, 41, 54);
	}

	pre {
		text-shadow: none;
		background-color: #5a5f80;
	}

	/* Inline code */

	:not(pre) > code[class*='language-'] {
		border-radius: 0.3em;
		white-space: normal;
	}

	pre {
		color: #ccc;
		background: rgb(40, 41, 54);
	}

	.limit-300 {
		height: 300px !important;
	}

	.limit-400 {
		height: 400px !important;
	}

	.limit-500 {
		height: 500px !important;
	}

	.limit-600 {
		height: 600px !important;
	}

	.limit-700 {
		height: 700px !important;
	}

	.limit-800 {
		height: 800px !important;
	}

	.token.comment {
		color: rgba(98, 114, 164, 1);
	}

	.token.prolog {
		color: rgba(207, 207, 194, 1);
	}

	.token.tag {
		color: rgba(220, 104, 170, 1);
	}

	.token.entity {
		color: rgba(139, 233, 253, 1);
	}

	.token.atrule {
		color: rgba(98, 239, 117, 1);
	}

	.token.url {
		color: rgba(102, 217, 239, 1);
	}

	.token.selector {
		color: rgba(207, 207, 194, 1);
	}

	.token.string {
		color: rgba(241, 250, 140, 1);
	}

	.token.property {
		color: rgba(255, 184, 108, 1);
	}

	.token.important {
		color: rgba(255, 121, 198, 1);
		font-weight: bold;
	}

	.token.punctuation {
		color: rgba(230, 219, 116, 1);
	}

	.token.number {
		color: rgba(189, 147, 249, 1);
	}

	.token.function {
		color: rgba(80, 250, 123, 1);
	}

	.token.class-name {
		color: rgba(255, 184, 108, 1);
	}

	.token.keyword {
		color: rgba(255, 121, 198, 1);
	}

	.token.boolean {
		color: rgba(255, 184, 108, 1);
	}

	.token.operator {
		color: rgba(139, 233, 253, 1);
	}

	.token.char {
		color: rgba(255, 135, 157, 1);
	}

	.token.regex {
		color: rgba(80, 250, 123, 1);
	}

	.token.variable {
		color: rgba(80, 250, 123, 1);
	}

	.token.constant {
		color: rgba(255, 184, 108, 1);
	}

	.token.symbol {
		color: rgba(255, 184, 108, 1);
	}

	.token.builtin {
		color: rgba(255, 121, 198, 1);
	}

	.token.attr-value {
		color: #7ec699;
	}

	.token.deleted {
		color: #e2777a;
	}

	.token.namespace {
		color: #e2777a;
	}

	.token.bold {
		font-weight: bold;
	}

	.token.italic {
		font-style: italic;
	}

	.token {
		color: #ff79c6;
	}

	.langague-cpp .token.string {
		color: #8be9fd;
	}

	.langague-c .token.string {
		color: #8be9fd;
	}

	.language-css .token.selector {
		color: rgba(80, 250, 123, 1);
	}

	.language-css .token.property {
		color: rgba(255, 184, 108, 1);
	}

	.language-java span.token.class-name {
		color: #8be9fd;
	}

	.language-java .token.class-name {
		color: #8be9fd;
	}

	.language-markup .token.attr-value {
		color: rgba(102, 217, 239, 1);
	}

	.language-markup .token.tag {
		color: rgba(80, 250, 123, 1);
	}

	.language-objectivec .token.property {
		color: #66d9ef;
	}

	.language-objectivec .token.string {
		color: #50fa7b;
	}

	.language-php .token.boolean {
		color: #8be9fd;
	}

	.language-php .token.function {
		color: #ff79c6;
	}

	.language-php .token.keyword {
		color: #66d9ef;
	}

	.language-ruby .token.symbol {
		color: #8be9fd;
	}

	.language-ruby .token.class-name {
		color: #cfcfc2;
	}

	pre.line-numbers {
		position: relative;
		padding-left: 3.8em;
		counter-reset: linenumber;
	}

	pre.line-numbers > code {
		position: relative;
		white-space: inherit;
	}

	.line-numbers .line-numbers-rows {
		position: absolute;
		pointer-events: none;
		top: 0;
		font-size: 100%;
		left: -3.8em;
		width: 3em;
		/* works for line-numbers below 1000 lines */
		letter-spacing: -1px;
		border-right: 1px solid #999;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.line-numbers-rows > span {
		pointer-events: none;
		display: block;
		counter-increment: linenumber;
	}

	.line-numbers-rows > span:before {
		content: counter(linenumber);
		color: #999;
		display: block;
		padding-right: 0.8em;
		text-align: right;
	}

	div.code-toolbar {
		position: relative;
	}

	div.code-toolbar > .toolbar {
		position: absolute;
		top: 0.3em;
		right: 0.2em;
		transition: opacity 0.3s ease-in-out;
		opacity: 0;
	}

	div.code-toolbar:hover > .toolbar {
		opacity: 1;
	}

	div.code-toolbar > .toolbar .toolbar-item {
		display: inline-block;
		padding-right: 20px;
	}

	div.code-toolbar > .toolbar a {
		cursor: pointer;
	}

	div.code-toolbar > .toolbar button {
		background: none;
		border: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		padding: 0;
		-webkit-user-select: none;
		/* for button */
		-moz-user-select: none;
		-ms-user-select: none;
	}

	div.code-toolbar > .toolbar a,
	div.code-toolbar > .toolbar button,
	div.code-toolbar > .toolbar span {
		color: #ccc;
		font-size: 0.8em;
		padding: 0.5em;
		background: rgba(98, 114, 164, 1);
		border-radius: 0.5em;
	}

	div.code-toolbar > .toolbar a:hover,
	div.code-toolbar > .toolbar a:focus,
	div.code-toolbar > .toolbar button:hover,
	div.code-toolbar > .toolbar button:focus,
	div.code-toolbar > .toolbar span:hover,
	div.code-toolbar > .toolbar span:focus {
		color: inherit;
		text-decoration: none;
		background-color: var(--verde);
	}
`;

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
		--colors-tip-background: #939393;
		--colors-about-link-icon: #a8a8a8;
		--colors-paste: #acbac7a8;
		--colors-paste-hover: #acbac7;
	}

	html {
		overflow-y: scroll;
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
		--colors-tab-text: #6e6d7a;
		--colors-tab-selected: #0d0c22;
		--colors-tab-selected-background: rgba(13, 12, 34, 0.05);
		--colors-post-card-border: rgba(0, 0, 0, 0.12);
		--colors-blockquote-border: rgba(255, 92, 0, 0.7);
		--colors-content-text: #37352f;
		--colors-about-link-icon-hover: rgba(0, 0, 0, 0.06);
		--colors-blockquote-background: #f2ffee75;
		${prism}
	}
`;

const darkStyle = css`
	body[data-theme='dark'] {
		--colors-text: white;
		--colors-background: black;
		--colors-tab-text: #768390;
		--colors-tab-selected: #acbac7;
		--colors-tab-selected-background: #373e47;
		--colors-post-card-border: #363f47;
		--colors-blockquote-border: #ff5c00;
		--colors-content-text: #e6e6e6;
		--colors-about-link-icon-hover: rgba(213, 213, 213, 0.26);
		--colors-blockquote-background: #fafbfc2b;
		${dark}
	}
`;

const defaultStyle = css`
	${resetStyle};
	${commonStyle};
	${lightStlye};
	${darkStyle};
`;

export default GlobalStyle;
