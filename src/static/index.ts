import test from './test.md';
import { MdFile } from 'types';
import matter from 'gray-matter';
import { CustomGrayMatterFile } from '@components/common';

export const files: MdFile[] = [test].map((file, idx) => ({
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
