import matter from 'gray-matter';
import fs from 'fs';

const categorySet = new Set();

export const filesInfo = {
	files: [],
	getCategories: () => {
		return Array.from(categorySet);
	},
};

if (typeof process !== 'undefined') {
	// Node.js 환경 -> readFileSync 사용
	filesInfo.files = [
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
	];
} else {
	const deploy = await import(
		'./React_개발블로그_배포기_(Feat_GitHubPages).md'
	);
	const test = await import('./헤드리스_컴포넌트_클린코드_접근법.md');

	filesInfo.files = [deploy, test];
}

function addCategory(file) {
	const { data } = matter(file);
	data.categories.forEach((category) => categorySet.add(category));
}
