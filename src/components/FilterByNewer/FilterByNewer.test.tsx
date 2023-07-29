import FilterByNewer from './FilterByNewer';
import { Provider } from 'react-redux';
import {
    IStoreType,
    createStore
} from 'src/app/store';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import * as todoItemsFiltersActions from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

describe('FilterByNewer', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <FilterByNewer className='foo' />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('toggles newer filter on click', () => {
        const todoItemNewerSpy = jest.spyOn(todoItemsFiltersActions, 'showNewerToggled');

        render(
            <Provider store={store}>
                <FilterByNewer className='foo' />
            </Provider>
        );

        let button: HTMLInputElement = screen.getByLabelText('Filter by newer');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(todoItemNewerSpy).toHaveBeenCalledTimes(1);
    })
});