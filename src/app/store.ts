import { configureStore } from '@reduxjs/toolkit'

import todoItemsReducer from 'src/features/todoItems/todoItemsSlice'

export const store = configureStore({
    reducer: {
        todoItems: todoItemsReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;