import toast from './toast';

export function copyToClipboard(code: string) {
	navigator.clipboard
		.writeText(code)
		.then(() => {
			toast('복사 완료', { delay: 2000 });
		})
		.catch((err) => {
			toast('복사 실패.. 다시 시도해주세요', { delay: 2000 });
			console.error(err);
		});
}
