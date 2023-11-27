import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

type DateProps = {
	date: string;
	format?: string;
};

const Date: FunctionComponent<DateProps> = ({
	date,
	format = 'MMMM DD, YYYY',
}) => {
	return <span>{dayjs(date).locale('en').format(format)}</span>;
};

export default Date;
