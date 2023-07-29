import FilterByOlder from './FilterByOlder';
import { Provider } from 'react-redux';
import {
    IStoreType,
    createStore
} from 'src/app/store';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import * as todoItemsFiltersActions from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

describe('FilterByOlder', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <FilterByOlder className='foo' />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('toggles older filter on click', () => {
        const todoItemOlderSpy = jest.spyOn(todoItemsFiltersActions, 'showOlderToggled');

        render(
            <Provider store={store}>
                <FilterByOlder className='foo' />
            </Provider>
        );

        let button: HTMLInputElement = screen.getByLabelText('Filter by older');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(todoItemOlderSpy).toHaveBeenCalledTimes(1);
    })
});