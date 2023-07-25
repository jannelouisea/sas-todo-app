import {
    Item
} from 'src/components'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { todoItemAdded, todoItemToggled } from 'src/features/todoItems/todoItemsSlice'
import {
    IToDoItem
} from 'src/interfaces/'
import moment from 'moment'

function ToDoList() {
    const todoItems = useAppSelector(state => state.todoItems);
    const dispatch = useAppDispatch();

    const handleAddItem = () => {
        dispatch(todoItemAdded({
            id: `todo-item-${todoItems.length + 1}`,
            text: `Hello World Again`,
            createdAt: moment().toDate(),
        }))
    };

    const handleToggleItem = (id: string) => {
        dispatch(todoItemToggled(id));
    }

    return (
        <div className="m-6">
            <div>
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            {
                todoItems.map((item: IToDoItem) =>
                    <div key={item.id} className="mb-1">
                        <div>{item.id}</div>
                        <div>{item.text}</div>
                        <div>{item.createdAt.toDateString()}</div>
                        <div>{`${item.completed}`}</div>
                        <button onClick={() => handleToggleItem(item.id)}>Toggle Item</button>
                    </div>
                )
            }
        </div>
    );
}

export default ToDoList;