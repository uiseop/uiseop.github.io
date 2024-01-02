import { compareTimes } from '@utils/compareTimes';
import { filesInfo } from './fileInfo';
import { CustomGrayMatterFile } from '@components/common';

export const files: CustomGrayMatterFile[] = [
	...(filesInfo.files as CustomGrayMatterFile[]),
].sort((a, b) => {
	const aDate = a.data.date;
	const bDate = b.data.date;
	return compareTimes(aDate, bDate);
});

export const categories = filesInfo.categories;
