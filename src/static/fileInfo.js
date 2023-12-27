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
		readFile('src/static/React_개발블로그_배포기3.md'),
		readFile('src/static/헤드리스_컴포넌트_클린코드_접근법.md'),
		readFile('src/static/useEffect_useLayoutEffect.md'),
		readFile('src/static/22860.md'),
	];
} else {
	const deploy = await import(
		'./React_개발블로그_배포기_(Feat_GitHubPages).md'
	);
	const deploy2 = await import('./React_개발블로그_배포기2.md');
	const deploy3 = await import('./React_개발블로그_배포기3.md');
	const test = await import('./헤드리스_컴포넌트_클린코드_접근법.md');
	const useEffect = await import('./useEffect_useLayoutEffect.md');
	const algo22860 = await import('./22860.md');

	addCategory(deploy.default);
	addCategory(test.default);
	addCategory(deploy2.default);
	addCategory(deploy3.default);
	addCategory(useEffect.default);
	addCategory(algo22860.default);

	filesInfo.files = [
		deploy.default,
		test.default,
		deploy2.default,
		deploy3.default,
		useEffect.default,
		algo22860.default,
	];
}

filesInfo.categories = [...categorySet];

function addCategory(file) {
	const { data } = matter(file);
	data.categories.forEach((category) => categorySet.add(category));
}
