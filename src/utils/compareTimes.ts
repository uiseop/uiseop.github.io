export function compareTimes(a: string, b: string) {
	const dateA = new Date(a);
	const dateB = new Date(b);

	if (dateA > dateB) {
		return -1; // dateA가 더 최신이면 -1 반환하여 앞으로 정렬
	} else if (dateA < dateB) {
		return 1; // dateB가 더 최신이면 1 반환하여 뒤로 정렬
	} else {
		return 0; // 같은 경우 유지
	}
}
