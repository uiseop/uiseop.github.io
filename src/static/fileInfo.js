import fs from 'fs';
import matter from 'gray-matter';

const categorySet = new Set();

export const filesInfo = {
	files: [
		fs.readFileSync(
			'src/static/React_개발블로그_배포기_(Feat_GitHubPages).md',
			'utf-8',
			(err, data) => {
				if (err) {
					return;
				}

				addCategory(data);

				return data;
			},
		),
		fs.readFileSync(
			'src/static/헤드리스_컴포넌트_클린코드_접근법.md',
			'utf-8',
			(err, data) => {
				if (err) {
					return;
				}

				addCategory(data);

				return data;
			},
		),
	],

	getCategories: () => {
		return Array.from(categorySet);
	},
};

function addCategory(file) {
	const { data } = matter(file);
	data.categories.forEach((category) => categorySet.add(category));
}
