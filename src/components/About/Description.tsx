import { FunctionComponent, useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@components/common/theme';

const WORDS = [
	'열정이 가득한',
	'즐겁게 일하는',
	'함께 성장하는',
	'지속가능한 소프트웨어를 만드는',
];

const writeSpeed = 100;
const deleteSpeed = 50;
const changeWordSpeed = 1000;
let wordIndex = 0;
let charIndex = 1;
let isDeleting = false;

const Description: FunctionComponent = () => {
	const cursorRef = useRef<HTMLSpanElement>(null);
	let timer: ReturnType<typeof setTimeout>;

	useEffect(() => {
		if (cursorRef.current) {
			timer = setTimeout(typeEffect);

			return () => {
				clearTimeout(timer);
			};
		}
	}, []);

	function typeEffect() {
		const currentWord = WORDS[wordIndex];
		const currentChar = currentWord.slice(0, charIndex);
		cursorRef.current!.textContent = currentChar;

		if (!isDeleting && charIndex < currentWord.length) {
			charIndex += 1;
			timer = setTimeout(typeEffect, writeSpeed);
		} else if (isDeleting && charIndex > 0) {
			charIndex -= 1;
			timer = setTimeout(typeEffect, deleteSpeed);
		} else {
			isDeleting = !isDeleting;
			wordIndex = !isDeleting ? (wordIndex + 1) % WORDS.length : wordIndex;
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
		right: '-4px',
		height: '100%',
		backgroundColor: theme.colors.background,
		borderLeft: `3px solid ${theme.colors.text}`,
		borderRadius: '3px',
		animation: `${blink} 0.7s infinite`,
	},
});

export default Description;
