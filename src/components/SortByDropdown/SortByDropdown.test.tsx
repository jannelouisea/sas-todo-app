import renderer from 'react-test-renderer';
import SortByDropdown from './SortByDropdown';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import * as todoItemsActions from 'src/features/todoItems/todoItemsSlice';
import * as todoItemsFiltersActions from 'src/features/todoItemsFilters/todoItemsFiltersSlice';
import {
    IStoreType,
    createStore
} from 'src/app/store';
import { Sort } from 'src/static/enums';

describe('SortByDropdown', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <SortByDropdown className='foo' />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('saves sorting order and sorts list on changes', () => {
        const sortByChangedSpy = jest.spyOn(todoItemsFiltersActions, 'sortByChanged');
        const todoItemsSortedSpy = jest.spyOn(todoItemsActions, 'todoItemsSorted');

        render(
            <Provider store={store}>
                <SortByDropdown className='foo' />
            </Provider>
        );

        // Verify select dropdown exists
        let select: HTMLInputElement = screen.getByLabelText('Sort by select');
        expect(select).toBeInTheDocument();
        fireEvent.click(select);

        // Simulate selecting an option
        const sortByOption = screen.getByRole("option", {
            name: 'Text (A to Z)'
        });
        expect(sortByOption).toBeInTheDocument();

        fireEvent.click(sortByOption);

        // Verify dispatch functions are called
        expect(sortByChangedSpy).toHaveBeenCalledTimes(1);
        expect(sortByChangedSpy).toHaveBeenCalledWith(Sort.TextAsc);
        expect(todoItemsSortedSpy).toHaveBeenCalledTimes(1);
        expect(todoItemsSortedSpy).toHaveBeenCalledWith(Sort.TextAsc);
    });
});