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

const initialState: IToDoItem[] = [
    {
        id: 'init-item-001',
        text: 'Clean the house',
        createdAt: moment().toDate(),
        completed: false
    },
    {
        id: 'init-item-002',
        text: 'Pack things for upcoming trip',
        createdAt: moment('2023-07-18').toDate(),
        completed: false
    },
    {
        id: 'init-item-003',
        text: 'Make dinner',
        createdAt: moment('2023-07-25').toDate(),
        completed: true
    },
    {
        id: 'init-item-004',
        text: 'Prepare for SAS Interview',
        createdAt: moment('2023-07-15').toDate(),
        completed: true
    },
];

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