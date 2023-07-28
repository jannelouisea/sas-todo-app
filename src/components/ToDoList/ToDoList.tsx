import { useAppSelector } from 'src/app/hooks'
import { IToDoItem } from 'src/interfaces'
import { Item } from 'src/components'
import { isOlderItem } from 'src/utils';

function ToDoList() {
    const NO_ITEMS_MATCH_MSG = 'No to-do items found that meet the current search and filter criteria.';
    const ITEMS_COMPLETED_MSG = 'Hooray! You completed all of your to-do items. 🎉';

    const todoItems = useAppSelector(state => state.todoItems);
    const todoItemsFilters = useAppSelector(state => state.todoItemsFilters);

    const todoItemsExist = todoItems.length > 0;

    const itemMeetsCriteria = (item: IToDoItem) => {
        const includesSearchTeam = todoItemsFilters.searchTerm === '' ? true : item.text.includes(todoItemsFilters.searchTerm);
        const isOldItem = isOlderItem(item);
        return ((todoItemsFilters.showNewer && !item.completed && !isOldItem) ||
            (todoItemsFilters.showOlder && !item.completed && isOldItem) ||
            (todoItemsFilters.showCompleted && item.completed)) && includesSearchTeam;
    }

    const filteredItems = todoItems.filter(item => itemMeetsCriteria(item));
    const filteredItemsExist = filteredItems.length > 0;

    return (
        <div className="grid grid-flow-row row-span-1 overflow-auto">
            {
                todoItemsExist ?
                    filteredItemsExist ?
                        filteredItems.map((item: IToDoItem) => <div key={item.id} className='mb-4'><Item item={item} /></div>) :
                        <span className='text-center mt-4'>{NO_ITEMS_MATCH_MSG}</span>
                    : <span className='text-center mt-4'>{ITEMS_COMPLETED_MSG}</span>
            }
        </div>
    );
}

export default ToDoList;