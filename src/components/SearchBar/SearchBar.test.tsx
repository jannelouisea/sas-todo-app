import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { store } from 'src/app/store';


const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('SearchBar', () => {
    const initialState = {
        todoItemsFilters: {
            searchTerm: 'Cleaning up'
        }
    };
    const labelTextId = 'Search to-do items';

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={mockStore(initialState)}>
                    <SearchBar />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders search term filter value', () => {
        render(
            <Provider store={mockStore(initialState)}>
                <SearchBar />
            </Provider>
        );

        let input: HTMLInputElement = screen.getByLabelText(labelTextId);
        expect(input).toBeInTheDocument();
        expect(input.value).toEqual('Cleaning up');
    });

    it('updates search term filter value on change', () => {
        render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        let input: HTMLInputElement = screen.getByLabelText(labelTextId);
        expect(input).toBeInTheDocument();

        const newSearchTerm = 'Walk dog'
        fireEvent.change(input, { target: { value: newSearchTerm } });
        input = screen.getByLabelText(labelTextId);

        expect(input.value).toEqual(newSearchTerm);
    });
});