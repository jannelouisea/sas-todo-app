import { useAppSelector } from 'src/app/hooks'
import {
    IToDoItem
} from 'src/interfaces/'
import {
    Item
} from 'src/components'

function ToDoList() {
    const todoItems = useAppSelector(state => state.todoItems);

    return (
        // JLA - Work on what happens with multiple elements
        <div className="grid grid-flow-row row-span-1 overflow-auto">
            {
                todoItems.map((item: IToDoItem) => <div className='mb-4'><Item item={item} /></div>)
            }
        </div>
    );
}

export default ToDoList;