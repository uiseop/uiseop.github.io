import matter from 'gray-matter';
import fs from 'fs';

const categorySet = new Set();

export const filesInfo = {
	files: [], // { data, content }[]
	categories: [],
};

if (typeof process !== 'undefined') {
	// Node.js 환경 -> readFileSync 사용
	const readFile = (direction) => {
		const file = fs.readFileSync(direction, 'utf-8');
		return file;
	};

	filesInfo.files = [
		handleFile(
			readFile('src/static/React_개발블로그_배포기_(Feat_GitHubPages).md'),
		),
		handleFile(readFile('src/static/React_개발블로그_배포기2.md')),
		handleFile(readFile('src/static/React_개발블로그_배포기3.md')),
		handleFile(readFile('src/static/헤드리스_컴포넌트_클린코드_접근법.md')),
		handleFile(readFile('src/static/useEffect_useLayoutEffect.md')),
		handleFile(readFile('src/static/22860.md')),
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

	filesInfo.files = [
		handleFile(deploy.default),
		handleFile(test.default),
		handleFile(deploy2.default),
		handleFile(deploy3.default),
		handleFile(useEffect.default),
		handleFile(algo22860.default),
	];
}

filesInfo.categories = [...categorySet];

function handleFile(file) {
	const { data, content } = matter(file);

	addCategory(data);

	return {
		data,
		content,
	};
}

function addCategory(data) {
	data.categories.forEach((category) => categorySet.add(category));
}
