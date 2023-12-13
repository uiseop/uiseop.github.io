import { Event, eventManager } from '@core/eventManager';
import { useEffect, useRef, useState } from 'react';
import {
	Id,
	NotValidatedToastProps,
	Toast,
	ToastContainerProps,
	ToastContent,
	ToastProps,
} from 'types';
import TToast from './Toast';
import ToastModal from './ToastModal';

interface QueuedToast {
	toastContent: ToastContent;
	toastProps: ToastProps;
	staleId?: Id;
}

export interface ContainerInstance {
	toastKey: number;
	displayedToast: number;
	props: ToastContainerProps;
	containerId?: Id | null;
	isToastActive: (toastId: Id) => boolean;
	getToast: (id: Id) => Toast | null | undefined;
	queue: QueuedToast[];
	count: number;
}

// const toastToRender = new Map<Id, Toast>();

const ToastContainer = () => {
	const [, setToastIds] = useState<Id[]>([]);
	const toastToRender = useRef(new Map<Id, Toast>()).current;

	useEffect(() => {
		eventManager.on(Event.Show, buildToast).on(Event.Clear, clearToast);

		return () => {
			toastToRender.clear();
			eventManager.off(Event.Show).off(Event.Clear);
		};
	}, []);

	function clearToast(toastId: Id) {
		removeToast(toastId);
	}

	function removeToast(toastId: Id) {
		setToastIds((cur) =>
			toastId === undefined ? [] : cur.filter((id) => id !== toastId),
		);

		toastToRender.delete(toastId);
	}

	function appendToast(content: ToastContent, toastProps: ToastProps) {
		const { toastId } = toastProps;
		const toast = { content, props: toastProps };

		toastToRender.set(toastId, toast);
		setToastIds((cur) => [...cur, toastId]);
	}

	function buildToast(
		content: ToastContent,
		{ delay, ...options }: NotValidatedToastProps,
	) {
		const { toastId } = options;
		const closeToast = () => {
			removeToast(toastId);
		};
		const toastProps = {
			...options,
			delay,
			closeToast,
		};

		appendToast(content, toastProps);

		setTimeout(() => {
			closeToast();
		}, delay + 1000);
	}

	return (
		<ToastModal>
			{Array.from(toastToRender.values()).map(
				({ content, props: toastProps }) => {
					return (
						<TToast {...toastProps} key={`toast-${toastProps.toastId}`}>
							{content}
						</TToast>
					);
				},
			)}
		</ToastModal>
	);
};

export default ToastContainer;
