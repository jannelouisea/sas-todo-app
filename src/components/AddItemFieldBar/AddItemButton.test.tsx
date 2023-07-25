import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import AddItemButton from './AddItemButton';

describe('AddItemButton', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<AddItemButton onClick={() => true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onClick prop function on click', () => {
        const onClickSpy = jest.fn();
        render(
            <AddItemButton onClick={onClickSpy} />
        );
        fireEvent.click(screen.getByLabelText('Add to-do item button'));
        expect(onClickSpy).toHaveBeenCalledTimes(1);
    })
});
