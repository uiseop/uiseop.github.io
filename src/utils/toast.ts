import { NotValidatedToastProps, ToastContent, ToastOptions } from 'types';
import { isNum, isStr } from './propValidators';
import { Event, eventManager } from '@core/eventManager';

let TOAST_ID = 1;

function generateToastId() {
	return `${TOAST_ID++}`;
}

function getToastId(options?: ToastOptions) {
	return options && (isStr(options.toastId) || isNum(options.toastId))
		? options.toastId
		: generateToastId();
}

function mergeOptions(options: ToastOptions) {
	return {
		...options,
		toastId: getToastId(options),
	} as NotValidatedToastProps;
}

function toast(content: ToastContent, options: ToastOptions) {
	return dispatchToast(content, mergeOptions(options));
}

function dispatchToast(content: ToastContent, options: NotValidatedToastProps) {
	eventManager.emit(Event.Show, content, options);
}

export default toast;
