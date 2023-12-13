import dayjs from 'dayjs';

type DateProps = {
	date: string;
	format?: string;
};

export const Date = ({ date, format = 'MMMM DD, YYYY' }: DateProps) => {
	return <span>{dayjs(date).locale('en').format(format)}</span>;
};
