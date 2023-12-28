import matter from 'gray-matter';
import { CustomGrayMatterFile } from '@components/common';
import { compareTimes } from '@utils/compareTimes';
import { filesInfo } from './fileInfo';
import { mdFile } from 'types';

export const files: mdFile[] = [...filesInfo.files].sort((a, b) => {
	const {
		data: { date: aDate },
	} = matter(a) as CustomGrayMatterFile;
	const {
		data: { date: bDate },
	} = matter(b) as CustomGrayMatterFile;
	return compareTimes(aDate, bDate);
});

export const categories = filesInfo.categories;
