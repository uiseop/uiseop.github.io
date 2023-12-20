import matter from 'gray-matter';
import fs from 'fs';

const categorySet = new Set();

export const filesInfo = {
	files: [],
	categories: [],
};

if (typeof process !== 'undefined') {
	// Node.js 환경 -> readFileSync 사용
	const readFile = (direction) => {
		const data = fs.readFileSync(direction, 'utf-8');
		addCategory(data);
		return data;
	};

	filesInfo.files = [
		readFile('src/static/React_개발블로그_배포기_(Feat_GitHubPages).md'),
		readFile('src/static/React_개발블로그_배포기2.md'),
		readFile('src/static/헤드리스_컴포넌트_클린코드_접근법.md'),
	];
} else {
	const deploy = await import(
		'./React_개발블로그_배포기_(Feat_GitHubPages).md'
	);
	const deploy2 = await import('./React_개발블로그_배포기2.md');
	const test = await import('./헤드리스_컴포넌트_클린코드_접근법.md');

	addCategory(deploy.default);
	addCategory(test.default);
	addCategory(deploy2.default);

	filesInfo.files = [deploy.default, test.default, deploy2.default];
}

filesInfo.categories = [...categorySet];

function addCategory(file) {
	const { data } = matter(file);
	data.categories.forEach((category) => categorySet.add(category));
}
