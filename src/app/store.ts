import { configureStore } from '@reduxjs/toolkit'

import todoItemsReducer from 'src/features/todoItems/todoItemsSlice'
import todoItemsFiltersReducer from 'src/features/todoItemsFilters/todoItemsFiltersSlice'

export const createStore = () => {
    return configureStore({
        reducer: {
            todoItems: todoItemsReducer,
            todoItemsFilters: todoItemsFiltersReducer,
        }
    });
}

export const store = createStore();

export type IStoreType = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;