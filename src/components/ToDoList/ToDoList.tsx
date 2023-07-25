import {
    Item
} from 'src/components'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { todoItemAdded } from 'src/features/todoItems/todoItemsSlice'
import {
    IToDoItem
} from 'src/interfaces/'

function ToDoList() {
    const todoItems = useAppSelector(state => state.todoItems);

    return (
        <>
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
        </>
    );
}

export default ToDoList;