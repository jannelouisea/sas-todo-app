import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleItemButton from './ToggleItemButton';
import * as todoItemsActions from 'src/features/todoItems/todoItemsSlice';
import { Provider } from 'react-redux';
import {
    IStoreType,
    createStore
} from 'src/app/store';

import {
    MUIColor,
    MUIVariant,
} from 'src/static/enums'

describe('ToggleItemButton', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <ToggleItemButton itemId='foo-id' />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('toggles item and sorts items on toggle', () => {
        const itemId = 'foo-id';
        const todoItemToggledSpy = jest.spyOn(todoItemsActions, 'todoItemToggled');
        const todoItemsSortedSpy = jest.spyOn(todoItemsActions, 'todoItemsSorted');

        render(
            <Provider store={store}>
                <ToggleItemButton
                    itemId={itemId}
                    color={MUIColor.Success}
                    variant={MUIVariant.Soft}
                />
            </Provider>
        );

        const toggle = screen.getByLabelText('Complete item button');
        expect(toggle).toBeInTheDocument();

        fireEvent.click(toggle);

        expect(todoItemToggledSpy).toHaveBeenCalledTimes(1);
        expect(todoItemToggledSpy).toHaveBeenCalledWith(itemId);
        expect(todoItemsSortedSpy).toHaveBeenCalledTimes(1);
    })
});
