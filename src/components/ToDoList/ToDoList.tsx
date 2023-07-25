import {
    Item
} from 'src/components'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { todoItemAdded } from 'src/features/todoItems/todoItemsSlice'
import {
    IToDoItem
} from 'src/interfaces/'
import moment from 'moment'

function ToDoList() {
    const todoItems = useAppSelector(state => state.todoItems);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(todoItemAdded({
            id: `todo-item-${todoItems.length + 1}`,
            text: `Hello World Again`,
            createdAt: moment().toDate(),
        }))
    };

    return (
        <div className="m-6">
            <div>
                <button onClick={handleClick}>Add Item</button>
            </div>
            {
                todoItems.map((item: IToDoItem) =>
                    <div key={item.id} className="mb-1">
                        <div>{item.text}</div>
                        <div>{item.createdAt.toDateString()}</div>
                        <div>{`${item.completed}`}</div>
                    </div>
                )
            }
            <Item />
            <Item />
            <Item />
            <Item />
        </div>
    );
}

export default ToDoList;