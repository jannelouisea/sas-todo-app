import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ITodoItemsFilters = {
    searchTerm: string,
    showNewer: boolean,
    showOlder: boolean,
    showCompleted: boolean,
}

const initialState: ITodoItemsFilters = {
    searchTerm: '',
    showNewer: true,
    showOlder: true,
    showCompleted: true
};

const todoItemsFiltersSlice = createSlice({
    name: 'todoItemsFilters',
    initialState,
    reducers: {
        searchTermChanged(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        showNewerToggled(state) {
            state.showNewer = !state.showNewer;
        },
        showOlderToggled(state) {
            state.showOlder = !state.showOlder;
        },
        showCompletedToggled(state) {
            state.showCompleted = !state.showCompleted;
        },
    }
});

export const {
    searchTermChanged,
    showNewerToggled,
    showOlderToggled,
    showCompletedToggled,
} = todoItemsFiltersSlice.actions;

export default todoItemsFiltersSlice.reducer;