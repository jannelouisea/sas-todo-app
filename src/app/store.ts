import { configureStore } from '@reduxjs/toolkit'

import todoItemsReducer from 'src/features/todoItems/todoItemsSlice'
import todoItemsFiltersReducer from 'src/features/todoItemsFilters/todoItemsFiltersSlice'

export const store = configureStore({
    reducer: {
        todoItems: todoItemsReducer,
        todoItemsFilters: todoItemsFiltersReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;