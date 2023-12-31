import { FunctionComponent, useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@components/common/theme';

const WORDS = [
	'지속가능한 소프트웨어를 만드는',
	'열정이 가득한',
	'즐겁게 일하는',
	'함께 성장하는',
];

const writeSpeed = 100;
const deleteSpeed = 50;
const changeWordSpeed = 1000;

export const Description: FunctionComponent = () => {
	const cursorRef = useRef<HTMLSpanElement>(null);
	let timer: ReturnType<typeof setTimeout>;
	let wordIndex = useRef(0);
	let charIndex = useRef(1);
	let isDeleting = useRef(false);

	useEffect(() => {
		if (cursorRef.current) {
			timer = setTimeout(typeEffect, 500);
		}
		return () => {
			clearTimeout(timer);
		};
	}, []);

	function typeEffect() {
		const currentWord = WORDS[wordIndex.current];
		const currentChar = currentWord.slice(0, charIndex.current);
		cursorRef.current!.textContent = currentChar;

		if (!isDeleting.current && charIndex.current < currentWord.length) {
			charIndex.current += 1;
			timer = setTimeout(typeEffect, writeSpeed);
		} else if (isDeleting.current && charIndex.current > 0) {
			charIndex.current -= 1;
			timer = setTimeout(typeEffect, deleteSpeed);
		} else {
			isDeleting.current = !isDeleting.current;
			wordIndex.current = !isDeleting.current
				? (wordIndex.current + 1) % WORDS.length
				: wordIndex.current;
			timer = setTimeout(typeEffect, changeWordSpeed);
		}
	}

	return (
		<p>
			안녕하세요.
			<br />
			<CursorSpan ref={cursorRef} />
			<br />
			개발자 <strong>이의섭</strong>입니다.
		</p>
	);
};

const blink = keyframes`
	50% {
		opacity: 0;
	}
`;

const CursorSpan = styled.span({
	position: 'relative',
	'&::after': {
		content: '""',
		position: 'absolute',
		right: '-6px',
		height: '3rem',
		backgroundColor: theme.colors.background,
		borderLeft: `3px solid ${theme.colors.text}`,
		borderRadius: '3px',
		animation: `${blink} 0.7s infinite`,
	},
});
