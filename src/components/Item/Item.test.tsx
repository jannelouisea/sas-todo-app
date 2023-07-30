import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from './Item';
import {
    IToDoItem
} from 'src/interfaces/';
import { Provider } from 'react-redux';
import {
    IStoreType,
    createStore
} from 'src/app/store';
import moment from 'moment';
import { isOlderItemUtil } from 'src/utils';

describe('Item', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const item: IToDoItem = {
            id: 'foo-id',
            text: 'To-do foo',
            createdAt: moment('2023-07-15').unix(),
            completed: false
        };

        const tree = renderer
            .create(
                <Provider store={store}>
                    <Item item={item} />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders completed item', () => {
        const item: IToDoItem = {
            id: 'foo-id',
            text: 'To-do foo',
            createdAt: moment('2023-07-15').unix(),
            completed: true
        };

        const tree = renderer
            .create(
                <Provider store={store}>
                    <Item item={item} />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders older item', () => {
        const item: IToDoItem = {
            id: 'foo-id',
            text: 'To-do foo',
            createdAt: moment('2023-06-15').unix(),
            completed: false
        };

        const tree = renderer
            .create(
                <Provider store={store}>
                    <Item item={item} />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders newer item', () => {
        const mockUtils = { isOlderItemUtil };
        const isOlderItemUtilSpy = jest.spyOn(mockUtils, 'isOlderItemUtil');
        isOlderItemUtilSpy.mockReturnValue(false);

        const item: IToDoItem = {
            id: 'foo-id',
            text: 'To-do foo',
            createdAt: moment('2023-06-15').unix(),
            completed: false
        };

        const tree = renderer
            .create(
                <Provider store={store}>
                    <Item item={item} />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
