import { css } from '@emotion/react';

export const ellipsis = css`
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	display: -webkit-box;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
`;
