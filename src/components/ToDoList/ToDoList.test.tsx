import thunkMiddleware from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ToDoList from './ToDoList';
import { Sort } from 'src/static/enums';
import { isOlderItemUtil } from 'src/utils';
import moment from 'moment';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('ToDoList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders newer items correctly', () => {
        const state = {
            todoItems: [
                {
                    id: 'item-001',
                    text: 'Test newer',
                    createdAt: moment().toDate(),
                    completed: false
                },
                {
                    id: 'item-002',
                    text: 'Test newer again',
                    createdAt: moment().toDate(),
                    completed: false
                },
            ],
            todoItemsFilters: {
                searchTerm: '',
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st,
            }
        };

        const { container } = render(
            <Provider store={mockStore(state)}>
                <ToDoList />
            </Provider>
        );

        // JLA
        // Checking actual container vs creating a snapshot since the newer dates will
        // always differ depending on when test was run.
        // Also, mocking isOlderItemUtils is not mocked at the Item component level
        const newerItems = container.getElementsByClassName('MuiCard-colorPrimary');
        const olderItems = container.getElementsByClassName('MuiCard-colorWarning');
        const completedItems = container.getElementsByClassName('MuiCard-colorSuccess');

        expect(newerItems.length).toBe(2);
        expect(olderItems.length).toBe(0);
        expect(completedItems.length).toBe(0);
    });

    it('renders older items correctly', () => {
        const state = {
            todoItems: [
                {
                    id: 'item-001',
                    text: 'Test older',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: false
                },
                {
                    id: 'item-002',
                    text: 'Test older again',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: false
                },
            ],
            todoItemsFilters: {
                searchTerm: '',
                showNewer: false,
                showOlder: true,
                showCompleted: false,
                sortBy: Sort.Incmpl1st,
            }
        };

        const tree = renderer
            .create(
                <Provider store={mockStore(state)}>
                    <ToDoList />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders completed items correctly', () => {
        const state = {
            todoItems: [
                {
                    id: 'item-001',
                    text: 'Test completed',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: true
                },
                {
                    id: 'item-002',
                    text: 'Test completed again',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: true
                },
            ],
            todoItemsFilters: {
                searchTerm: '',
                showNewer: false,
                showOlder: false,
                showCompleted: true,
                sortBy: Sort.Incmpl1st,
            }
        };

        const tree = renderer
            .create(
                <Provider store={mockStore(state)}>
                    <ToDoList />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    // Does not show newer items if newer filter is off
    it('does not render older items is showOlder filter is off', () => {
        const state = {
            todoItems: [
                {
                    id: 'item-001',
                    text: 'Test newer',
                    createdAt: moment().toDate(),
                    completed: false
                },
                {
                    id: 'item-002',
                    text: 'Test newer again',
                    createdAt: moment().toDate(),
                    completed: false
                },
            ],
            todoItemsFilters: {
                searchTerm: '',
                showNewer: false,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st,
            }
        };

        const { container } = render(
            <Provider store={mockStore(state)}>
                <ToDoList />
            </Provider>
        );

        // JLA
        // Checking actual container vs creating a snapshot since the newer dates will
        // always differ depending on when test was run.
        // Also, mocking isOlderItemUtils is not mocked at the Item component level
        const newerItems = container.getElementsByClassName('MuiCard-colorPrimary');
        const olderItems = container.getElementsByClassName('MuiCard-colorWarning');
        const completedItems = container.getElementsByClassName('MuiCard-colorSuccess');

        expect(newerItems.length).toBe(0);
        expect(olderItems.length).toBe(0);
        expect(completedItems.length).toBe(0);
    });

    // Does not show newer items if older filter is off
    it('does not render older items is showOlder filter is off', () => {
        const state = {
            todoItems: [
                {
                    id: 'item-001',
                    text: 'Test older',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: false
                },
                {
                    id: 'item-002',
                    text: 'Test older again',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: false
                },
            ],
            todoItemsFilters: {
                searchTerm: '',
                showNewer: false,
                showOlder: false,
                showCompleted: false,
                sortBy: Sort.Incmpl1st,
            }
        };

        const tree = renderer
            .create(
                <Provider store={mockStore(state)}>
                    <ToDoList />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('does not render completed items is showCompleted filter is off', () => {
        const state = {
            todoItems: [
                {
                    id: 'item-001',
                    text: 'Test completed',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: true
                },
                {
                    id: 'item-002',
                    text: 'Test completed again',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: true
                },
            ],
            todoItemsFilters: {
                searchTerm: '',
                showNewer: false,
                showOlder: false,
                showCompleted: false,
                sortBy: Sort.Incmpl1st,
            }
        };

        const tree = renderer
            .create(
                <Provider store={mockStore(state)}>
                    <ToDoList />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders items that match search term', () => {
        const state = {
            todoItems: [
                {
                    id: 'item-001',
                    text: 'testing',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: true
                },
                {
                    id: 'item-002',
                    text: 'not matching',
                    createdAt: moment('2023-07-18').toDate(),
                    completed: true
                },
            ],
            todoItemsFilters: {
                searchTerm: 'testing',
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st,
            }
        };

        const tree = renderer
            .create(
                <Provider store={mockStore(state)}>
                    <ToDoList />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    // Renders msg when no items exist
    it('renders msg when no to-do items exist', () => {
        const state = {
            todoItems: [],
            todoItemsFilters: {
                searchTerm: '',
                showNewer: true,
                showOlder: true,
                showCompleted: true,
                sortBy: Sort.Incmpl1st,
            }
        };

        const tree = renderer
            .create(
                <Provider store={mockStore(state)}>
                    <ToDoList />
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
