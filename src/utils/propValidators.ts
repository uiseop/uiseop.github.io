export const isNum = (v: any): v is Number =>
	typeof v === 'number' && !isNaN(v);

export const isStr = (v: any): v is String => typeof v === 'string';

export const isFn = (v: any): v is Function => typeof v === 'function';
