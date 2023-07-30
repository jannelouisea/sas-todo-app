import { ITodoItemsFilters } from 'src/interfaces';
import reducer, {
    searchTermChanged,
    showNewerToggled,
    showOlderToggled,
    showCompletedToggled
} from './todoItemsFiltersSlice';

import { Sort } from 'src/static/enums'

describe('todoItemsSliceFilters', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({
            searchTerm: '',
            showNewer: true,
            showOlder: true,
            showCompleted: true,
            sortBy: Sort.Incmpl1st
        });
    });

    describe('should handle an updated search term', () => {
        it('from an empty string to a non-empty string', () => {
            const previousState: ITodoItemsFilters = {
                searchTerm: '',
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st
            };

            const searchTerm = 'bar';
            const newState: ITodoItemsFilters = {
                searchTerm,
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st
            };

            expect(reducer(previousState, searchTermChanged(searchTerm))).toEqual(newState);
        });

        it('from a non-empty string to another non-empty string', () => {
            const previousState: ITodoItemsFilters = {
                searchTerm: 'foo',
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st
            };

            const searchTerm = 'bar';
            const newState: ITodoItemsFilters = {
                searchTerm,
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st
            };

            expect(reducer(previousState, searchTermChanged(searchTerm))).toEqual(newState);
        });

        it('from a non-empty empty string to an empty string', () => {
            const previousState: ITodoItemsFilters = {
                searchTerm: 'foo',
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st
            };

            const searchTerm = '';
            const newState: ITodoItemsFilters = {
                searchTerm,
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st
            };

            expect(reducer(previousState, searchTermChanged(searchTerm))).toEqual(newState);
        });
    });

    it('should handle show newer filter toggled', () => {
        const previousState: ITodoItemsFilters = {
            searchTerm: '',
            showNewer: true,
            showOlder: true,
            showCompleted: true,
            sortBy: Sort.Incmpl1st
        };

        const newState: ITodoItemsFilters = {
            searchTerm: '',
            showNewer: false,
            showOlder: true,
            showCompleted: true,
            sortBy: Sort.Incmpl1st
        };

        expect(reducer(previousState, showNewerToggled())).toEqual(newState);
        expect(reducer(newState, showNewerToggled())).toEqual(previousState);
    });

    it('should handle show older filter toggled', () => {
        const previousState: ITodoItemsFilters = {
            searchTerm: '',
            showNewer: true,
            showOlder: true,
            showCompleted: true,
            sortBy: Sort.Incmpl1st
        };

        const newState: ITodoItemsFilters = {
            searchTerm: '',
            showNewer: true,
            showOlder: false,
            showCompleted: true,
            sortBy: Sort.Incmpl1st
        };

        expect(reducer(previousState, showOlderToggled())).toEqual(newState);
        expect(reducer(newState, showOlderToggled())).toEqual(previousState);
    });

    it('should handle show completed filter toggled', () => {
        const previousState: ITodoItemsFilters = {
            searchTerm: '',
            showNewer: true,
            showOlder: true,
            showCompleted: true,
            sortBy: Sort.Incmpl1st
        };

        const newState: ITodoItemsFilters = {
            searchTerm: '',
            showNewer: true,
            showOlder: true,
            showCompleted: false,
            sortBy: Sort.Incmpl1st
        };

        expect(reducer(previousState, showCompletedToggled())).toEqual(newState);
        expect(reducer(newState, showCompletedToggled())).toEqual(previousState);
    });
});