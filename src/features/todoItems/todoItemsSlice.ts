import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    IToDoItem
} from 'src/interfaces'
import moment from 'moment';
import {
    Sort
} from 'src/static/enums'

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
            const newItem = {
                id,
                text,
                createdAt,
                completed: false
            };

            return [newItem, ...state];
        },
        todoItemToggled(state, action: PayloadAction<string>) {
            return state.map(item => {
                if (item.id !== action.payload) {
                    return item
                }

                return {
                    ...item,
                    completed: !item.completed
                }
            });
        },
        todoItemRemoved(state, action: PayloadAction<string>) {
            return state.filter(item => item.id !== action.payload);
        },
        todoItemsSorted(state, action: PayloadAction<Sort>) {
            let newState = [...state];

            switch (action.payload) {
                case Sort.DateDesc:
                    return newState.sort((itemA: IToDoItem, itemB: IToDoItem) =>
                        moment(itemB.createdAt).format('YYYYMMDD').localeCompare(moment(itemA.createdAt).format('YYYYMMDD'))
                    );
                case Sort.DateAsc:
                    return newState.sort((itemA: IToDoItem, itemB: IToDoItem) =>
                        moment(itemA.createdAt).format('YYYYMMDD').localeCompare(moment(itemB.createdAt).format('YYYYMMDD'))
                    );
                case Sort.TextDesc:
                    return newState.sort((itemA: IToDoItem, itemB: IToDoItem) =>
                        itemB.text.localeCompare(itemA.text)
                    );
                case Sort.TextAsc:
                    return newState.sort((itemA: IToDoItem, itemB: IToDoItem) =>
                        itemA.text.localeCompare(itemB.text)
                    );
                case Sort.Cmpl1st:
                    return newState.sort((itemA: IToDoItem, itemB: IToDoItem) => {
                        if (itemA.completed === itemB.completed) {
                            return moment(itemB.createdAt).format('YYYYMMDD').localeCompare(moment(itemA.createdAt).format('YYYYMMDD'))
                        } else if (itemA.completed) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                case Sort.Incmpl1st:
                default:
                    return newState.sort((itemA: IToDoItem, itemB: IToDoItem) => {
                        if (itemA.completed === itemB.completed) {
                            return moment(itemB.createdAt).format('YYYYMMDD').localeCompare(moment(itemA.createdAt).format('YYYYMMDD'))
                        } else if (itemA.completed) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
            }
        }
    }
});

export const { todoItemAdded, todoItemToggled, todoItemRemoved, todoItemsSorted } = todoItemsSlice.actions;

export default todoItemsSlice.reducer;