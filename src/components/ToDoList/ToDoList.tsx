import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { todoItemToggled } from 'src/features/todoItems/todoItemsSlice'
import {
    IToDoItem
} from 'src/interfaces/'

function ToDoList() {
    const todoItems = useAppSelector(state => state.todoItems);
    const dispatch = useAppDispatch();

    const handleToggleItem = (id: string) => {
        dispatch(todoItemToggled(id));
    }

    return (
        <div className="m-6">
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