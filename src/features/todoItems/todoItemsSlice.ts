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
    createdAt: number,
};

const initialState: IToDoItem[] = [
    {
        id: 'init-item-001',
        text: 'Clean the house',
        createdAt: moment().unix(),
        completed: false
    },
    {
        id: 'init-item-002',
        text: 'Pack things for upcoming trip',
        createdAt: 1689652800, // Tue Jul 18 2023 00:00:00 GMT-0400 (EST)
        completed: false
    },
    {
        id: 'init-item-003',
        text: 'Make dinner',
        createdAt: 1690257600, // Tue Jul 25 2023 00:00:00 GMT-0400 (EST)
        completed: true
    },
    {
        id: 'init-item-004',
        text: 'Prepare for SAS Interview',
        createdAt: 1689393600, // Sat Jul 15 2023 00:00:00 GMT-0400 (EST)

        completed: true
    },
];

const compareByCreatedDateDesc = (itemA: IToDoItem, itemB: IToDoItem): number => {
    if (itemB.createdAt === itemA.createdAt) {
        return itemA.text.localeCompare(itemB.text);
    }
    return itemB.createdAt - itemA.createdAt;
}

const compareByCreatedDateAsc = (itemA: IToDoItem, itemB: IToDoItem): number => {
    if (itemB.createdAt === itemA.createdAt) {
        return itemA.text.localeCompare(itemB.text);
    }
    return itemA.createdAt - itemB.createdAt;
}

const compareByTextAZ = (itemA: IToDoItem, itemB: IToDoItem): number => itemA.text.localeCompare(itemB.text);

const compareByTextZA = (itemA: IToDoItem, itemB: IToDoItem): number => itemB.text.localeCompare(itemA.text);

const compareByCompleted = (itemA: IToDoItem, itemB: IToDoItem): number => {
    if (itemA.completed === itemB.completed) {
        if (itemB.createdAt === itemA.createdAt) {
            return itemA.text.localeCompare(itemB.text);
        }
        return itemB.createdAt - itemA.createdAt;
    } else if (itemA.completed) {
        return -1;
    } else {
        return 1;
    }
};

const compareByIncomplete = (itemA: IToDoItem, itemB: IToDoItem): number => {
    if (itemA.completed === itemB.completed) {
        if (itemB.createdAt === itemA.createdAt) {
            return itemA.text.localeCompare(itemB.text);
        }
        return itemB.createdAt - itemA.createdAt;
    } else if (itemA.completed) {
        return 1;
    } else {
        return -1;
    }
}

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
                    return newState.sort(compareByCreatedDateDesc);
                case Sort.DateAsc:
                    return newState.sort(compareByCreatedDateAsc);
                case Sort.TextDesc:
                    return newState.sort(compareByTextZA);
                case Sort.TextAsc:
                    return newState.sort(compareByTextAZ);
                case Sort.Cmpl1st:
                    return newState.sort(compareByCompleted);
                case Sort.Incmpl1st:
                default:
                    return newState.sort(compareByIncomplete);
            }
        }
    }
});

export const { todoItemAdded, todoItemToggled, todoItemRemoved, todoItemsSorted } = todoItemsSlice.actions;

export default todoItemsSlice.reducer;