import test from './test.md';
import test2 from './test copy.md';
import test3 from './test copy 2.md';
import { MdFile } from 'types';
import matter from 'gray-matter';
import { CustomGrayMatterFile } from '@components/common';

export const files: MdFile[] = [test, test2, test3].map((file, idx) => ({
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
