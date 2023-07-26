import moment from 'moment';
import {
    IToDoItem
} from 'src/interfaces/'

const OLDER_THRESHOLD = 5;
const isOlderItem = (item: IToDoItem) => moment().diff(item.createdAt, 'days') > OLDER_THRESHOLD;

export default isOlderItem;
