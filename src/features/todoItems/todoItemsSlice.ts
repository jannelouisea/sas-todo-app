import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    IToDoItem
} from 'src/interfaces'
import moment from 'moment';

export type ITodoItemAddedPayload = {
    id: string,
    text: string,
    createdAt: Date,
};

const initialState: IToDoItem[] = [];

const todoItemsSlice = createSlice({
    name: 'todoItems',
    initialState,
    reducers: {
        todoItemAdded(state, action: PayloadAction<ITodoItemAddedPayload>) {
            const { id, text, createdAt } = action.payload;
            state.unshift({
                id,
                text,
                createdAt,
                completed: false
            });
        },
        // action - id of the item being toggled
        todoItemToggled(state, action: PayloadAction<string>) {
            const todoItem = state.find(item => item.id === action.payload);
            if (todoItem) {
                todoItem.completed = !todoItem.completed
            }
        }
    }
});

export const { todoItemAdded, todoItemToggled } = todoItemsSlice.actions;

export default todoItemsSlice.reducer;