import 'gray-matter';
import matter from 'gray-matter';

declare module 'gray-matter' {
	export interface CustomGrayMatterFile extends matter.GrayMatterFile<'*.md'> {
		data: {
			date: string;
			categories: string[];
			[key: string]: any;
		};
	}
}
