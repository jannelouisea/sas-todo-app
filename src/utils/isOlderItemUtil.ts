import moment from 'moment';
import {
    IToDoItem
} from 'src/interfaces/'

const OLDER_THRESHOLD = 5;
const isOlderitemUtil = (item: IToDoItem): boolean => moment().diff(item.createdAt, 'days') > OLDER_THRESHOLD;

export default isOlderitemUtil;
