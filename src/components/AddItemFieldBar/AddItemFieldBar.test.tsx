import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import * as todoItemsActions from 'src/features/todoItems/todoItemsSlice';

import {
    IStoreType,
    createStore
} from 'src/app/store'

import AddItemFieldBar from './AddItemFieldBar';

describe('AddItemFieldBar', () => {
    const inputLabelTextId = 'Add to-do item input field';
    const addButtonLabelTextId = 'Add to-do item button';
    const IS_TEXT_EMPTY_ERR_MSG = 'To-do item cannot be blank.';

    let store: IStoreType;

    const errMsgNotFound = () => {
        let errFound = true;
        try {
            screen.getByText(IS_TEXT_EMPTY_ERR_MSG);
        } catch (e) {
            errFound = false;
        } finally {
            expect(errFound).toBeFalsy();
        }
    };

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <AddItemFieldBar />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('adds a new to-do item', () => {
        const todoItemAddedSpy = jest.spyOn(todoItemsActions, 'todoItemAdded');
        const todoItemsSortedSpy = jest.spyOn(todoItemsActions, 'todoItemsSorted');

        render(
            <Provider store={store}>
                <AddItemFieldBar />
            </Provider>
        );

        // Verify entering to-do item text
        let input: HTMLInputElement = screen.getByLabelText(inputLabelTextId);
        expect(input).toBeInTheDocument();

        const todoItemText = 'Clean dishes';
        fireEvent.change(input, { target: { value: todoItemText } });
        input = screen.getByLabelText(inputLabelTextId);
        expect(input.value).toEqual(todoItemText);

        // Verify adding to-do item to store
        let addButton: HTMLInputElement = screen.getByLabelText(addButtonLabelTextId);
        expect(addButton).toBeInTheDocument();

        fireEvent.click(addButton);

        expect(todoItemAddedSpy).toHaveBeenCalledTimes(1);
        expect(todoItemsSortedSpy).toHaveBeenCalledTimes(1);

        errMsgNotFound();
    });

    it('does not add new to-do item when text is empty', () => {
        const todoItemAddedSpy = jest.spyOn(todoItemsActions, 'todoItemAdded');
        const todoItemsSortedSpy = jest.spyOn(todoItemsActions, 'todoItemsSorted');

        render(
            <Provider store={store}>
                <AddItemFieldBar />
            </Provider>
        );

        // Verify entering to-do item text
        let input: HTMLInputElement = screen.getByLabelText(inputLabelTextId);
        expect(input).toBeInTheDocument();

        const todoItemText = '';
        fireEvent.change(input, { target: { value: todoItemText } });
        input = screen.getByLabelText(inputLabelTextId);
        expect(input.value).toEqual(todoItemText);

        // Verify adding to-do item to store
        let addButton: HTMLInputElement = screen.getByLabelText(addButtonLabelTextId);
        expect(addButton).toBeInTheDocument();

        fireEvent.click(addButton);

        expect(todoItemAddedSpy).toHaveBeenCalledTimes(0);
        expect(todoItemsSortedSpy).toHaveBeenCalledTimes(0);

        // Verify error message
        let errMsg = screen.getByText(IS_TEXT_EMPTY_ERR_MSG);
        expect(errMsg).toBeInTheDocument();
    });

    it('shows error message when user enters blank item text', () => {
        render(
            <Provider store={store}>
                <AddItemFieldBar />
            </Provider>
        );

        // Verify entering to-do item text
        let input: HTMLInputElement = screen.getByLabelText(inputLabelTextId);
        expect(input).toBeInTheDocument();

        let todoItemText = 'not empty';
        fireEvent.change(input, { target: { value: todoItemText } });
        input = screen.getByLabelText(inputLabelTextId);
        expect(input.value).toEqual(todoItemText);

        errMsgNotFound();

        todoItemText = '';
        fireEvent.change(input, { target: { value: todoItemText } });
        input = screen.getByLabelText(inputLabelTextId);
        expect(input.value).toEqual(todoItemText);

        // Verify error message
        let errMsg = screen.getByText(IS_TEXT_EMPTY_ERR_MSG);
        expect(errMsg).toBeInTheDocument();
    });
})