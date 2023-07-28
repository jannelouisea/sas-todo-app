import FilterByCompleted from './FilterByCompleted';
import { Provider } from 'react-redux';
import {
    IStoreType,
    createStore
} from 'src/app/store';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import * as todoItemsFiltersActions from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

describe('FilterByCompleted', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <FilterByCompleted className='foo' />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('toggles completed filter on click', () => {
        const todoItemCompletedSpy = jest.spyOn(todoItemsFiltersActions, 'showCompletedToggled');

        render(
            <Provider store={store}>
                <FilterByCompleted className='foo' />
            </Provider>
        );

        let button: HTMLInputElement = screen.getByLabelText('Filter by completed');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(todoItemCompletedSpy).toHaveBeenCalledTimes(1);
    })
});