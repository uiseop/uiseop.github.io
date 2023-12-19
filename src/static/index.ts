import matter from 'gray-matter';
import { CustomGrayMatterFile } from '@components/common';
import { compareTimes } from '@utils/compareTimes';
import { filesInfo } from './fileInfo';

export const files = [...filesInfo.files]
	.sort((a, b) => {
		const {
			data: { date: aDate },
		} = matter(a) as CustomGrayMatterFile;
		const {
			data: { date: bDate },
		} = matter(b) as CustomGrayMatterFile;
		return compareTimes(aDate, bDate);
	})
	.map((file, idx) => ({
		file,
		key: idx,
	}));

export const categories = filesInfo.getCategories();
