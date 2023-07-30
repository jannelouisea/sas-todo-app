import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from 'src/static/enums'
import { ITodoItemsFilters } from 'src/interfaces';

const initialState: ITodoItemsFilters = {
    searchTerm: '',
    showNewer: true,
    showOlder: true,
    showCompleted: true,
    sortBy: Sort.Incmpl1st,
};

const todoItemsFiltersSlice = createSlice({
    name: 'todoItemsFilters',
    initialState,
    reducers: {
        searchTermChanged(state, action: PayloadAction<string>) {
            return { ...state, searchTerm: action.payload }
        },
        showNewerToggled(state) {
            return { ...state, showNewer: !state.showNewer }
        },
        showOlderToggled(state) {
            return { ...state, showOlder: !state.showOlder }
        },
        showCompletedToggled(state) {
            return { ...state, showCompleted: !state.showCompleted }
        },
        sortByChanged(state, action: PayloadAction<Sort>) {
            return { ...state, sortBy: action.payload }
        }
    }
});

export const {
    searchTermChanged,
    showNewerToggled,
    showOlderToggled,
    showCompletedToggled,
    sortByChanged,
} = todoItemsFiltersSlice.actions;

export default todoItemsFiltersSlice.reducer;