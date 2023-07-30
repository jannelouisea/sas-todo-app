import moment from 'moment';
import {
    IToDoItem
} from 'src/interfaces/'

const OLDER_THRESHOLD = 5;
const isOlderitemUtil = (item: IToDoItem): boolean => {
    const createdAt = moment.unix(item.createdAt).toDate();
    return moment().diff(createdAt, 'days') > OLDER_THRESHOLD;
};

export default isOlderitemUtil;
