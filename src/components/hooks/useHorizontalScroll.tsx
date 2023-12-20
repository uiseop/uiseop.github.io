import animate from '@utils/animate';
import { useEffect, useRef } from 'react';

const start = 'left';
const scrollStart = 'scrollLeft';
const end = 'right';

export const useHorizontalScroll = () => {
	const elementRef = useRef<HTMLElement>(null);
	let mouseStartX: number;
	let isDragging = false;
	let target: HTMLElement;

	useEffect(() => {
		const element = elementRef.current;

		if (element) {
			element.onmousedown = handleMouseDown;

			return () => {
				element.onmousedown = null;
			};
		}
	}, []);

	function handleMouseDown(downEvent: MouseEvent) {
		const element = elementRef.current;
		mouseStartX = element!.scrollLeft + downEvent.screenX;
		target = downEvent.target as HTMLElement;

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp, { once: true });
	}

	function handleMouseMove(moveEvent: MouseEvent) {
		const element = elementRef.current;
		const curMouseX = moveEvent.screenX;
		const x = mouseStartX - curMouseX;

		if (Math.abs(x) >= 10) {
			isDragging = true;
		}
		element!.scrollLeft = x;
	}

	function handleMouseUp(upEvent: MouseEvent) {
		if (!isDragging && target.tagName === 'BUTTON') {
			scrollSelectedIntoView(target);
		} else {
			const element = elementRef.current;
			const x = mouseStartX - upEvent.screenX;
			element!.scrollLeft += x;
		}

		document.removeEventListener('mousemove', handleMouseMove);
		isDragging = false;
	}

	function getTabsMeta(tab: HTMLElement) {
		const tabsNode = elementRef.current;
		let tabsMeta;
		if (tabsNode) {
			const rect = tabsNode.getBoundingClientRect();
			// create a new object with ClientRect class props + scrollLeft
			tabsMeta = {
				clientWidth: tabsNode.clientWidth,
				scrollLeft: tabsNode.scrollLeft,
				scrollTop: tabsNode.scrollTop,
				scrollWidth: tabsNode.scrollWidth,
				top: rect.top,
				bottom: rect.bottom,
				left: rect.left,
				right: rect.right,
			};
		}

		const tabMeta = tab.getBoundingClientRect();
		return { tabsMeta, tabMeta };
	}

	function scrollSelectedIntoView(tab: HTMLElement) {
		const { tabsMeta, tabMeta } = getTabsMeta(tab);

		if (!tabMeta || !tabsMeta) {
			return;
		}

		if (tabMeta[start] < tabsMeta[start]) {
			// left side of button is out of view
			const nextScrollStart =
				tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
			scroll(nextScrollStart);
		} else if (tabMeta[end] > tabsMeta[end]) {
			// right side of button is out of view
			const nextScrollStart =
				tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
			scroll(nextScrollStart);
		}
	}

	function scroll(scrollValue: number, { animation = true } = {}) {
		if (animation) {
			animate(scrollStart, elementRef.current, scrollValue);
		} else {
			elementRef.current![scrollStart] = scrollValue;
		}
	}

	return elementRef;
};
