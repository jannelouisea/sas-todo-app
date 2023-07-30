import { Provider } from 'react-redux';
import {
    IStoreType,
    createStore
} from 'src/app/store';
import RemoveItemButton from './RemoveItemButton';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import {
    MUIColor,
} from 'src/static/enums';
import * as todoItemsActions from 'src/features/todoItems/todoItemsSlice';

describe('RemoveButtonTest', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <RemoveItemButton itemId='foo-id' color={MUIColor.Primary} />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('removes item on click', () => {
        const itemId = 'foo-id';
        const todoItemRemovedSpy = jest.spyOn(todoItemsActions, 'todoItemRemoved');

        render(
            <Provider store={store}>
                <RemoveItemButton itemId={itemId} color={MUIColor.Primary} />
            </Provider>
        );

        const toggle = screen.getByLabelText('Remove item button');
        expect(toggle).toBeInTheDocument();

        fireEvent.click(toggle);

        expect(todoItemRemovedSpy).toHaveBeenCalledTimes(1);
        expect(todoItemRemovedSpy).toHaveBeenCalledWith(itemId);
    });
});