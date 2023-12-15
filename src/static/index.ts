import headless from './헤드리스_컴포넌트_클린코드_접근법.md';
import delpoy from './React_개발블로그_배포기_(Feat_GitHubPages).md';
import { MdFile } from 'types';
import matter from 'gray-matter';
import { CustomGrayMatterFile } from '@components/common';
import { compareTimes } from '@utils/compareTimes';

export const files: MdFile[] = [headless, delpoy]
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

let categorySet = new Set<string>();
export let categories: string[];

function handleCategories() {
	files.forEach(({ file }) => {
		const { data } = matter(file) as CustomGrayMatterFile;
		data.categories.forEach((category) => categorySet.add(category));
	});

	categories = Array.from(categorySet);
}

handleCategories();
