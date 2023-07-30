import { useAppSelector } from 'src/app/hooks'
import { IToDoItem } from 'src/interfaces'
import { Item } from 'src/components'
import { isOlderItemUtil } from 'src/utils';

function ToDoList() {
    const NO_ITEMS_MATCH_MSG = 'No to-do items found that meet the current search and filter criteria.';
    const ITEMS_COMPLETED_MSG = 'Hooray! No items in your to-do list. 🎉 (Are you sure you have nothing to-do?)';

    const todoItems = useAppSelector(state => state.todoItems);
    const todoItemsFilters = useAppSelector(state => state.todoItemsFilters);

    const todoItemsExist = todoItems.length > 0;

    const itemMeetsCriteria = (item: IToDoItem) => {
        const includesSearchTerm = todoItemsFilters.searchTerm === '' ? true : item.text.includes(todoItemsFilters.searchTerm);
        const isOldItem = isOlderItemUtil(item);
        return ((todoItemsFilters.showNewer && !item.completed && !isOldItem) ||
            (todoItemsFilters.showOlder && !item.completed && isOldItem) ||
            (todoItemsFilters.showCompleted && item.completed)) && includesSearchTerm;
    };

    const filteredItems = todoItems.filter(item => itemMeetsCriteria(item));
    const filteredItemsExist = filteredItems.length > 0;

    return (
        <div className="to-do-list no-scrollbar">
            {
                todoItemsExist ?
                    filteredItemsExist ?
                        filteredItems.map((item: IToDoItem) => <div key={item.id} className='to-do-list_item'><Item item={item} /></div>) :
                        <span className='to-do-list_msg'>{NO_ITEMS_MATCH_MSG}</span>
                    : <span className='to-do-list_msg'>{ITEMS_COMPLETED_MSG}</span>
            }
        </div>
    );
}

export default ToDoList;