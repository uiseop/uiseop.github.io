import { toastMessageAtom } from '@atom/index';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const DURATION = 2300;

const useToastModal = () => {
	const [toastMessage, setToastMessage] = useAtom(toastMessageAtom);

	useEffect(() => {
		if (!toastMessage) return;

		const timer = setTimeout(() => {
			setToastMessage('');
		}, DURATION);

		return () => {
			clearTimeout(timer);
		};
	}, [toastMessage]);

	return { setToastMessage };
};

export default useToastModal;
