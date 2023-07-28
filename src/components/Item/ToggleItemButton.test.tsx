import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleItemButton from './ToggleItemButton';

import {
    MUIColor,
    MUIVariant,
} from 'src/static/enums'

describe('ToggleItemButton', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<ToggleItemButton />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onClick prop function on click', () => {
        const onClickSpy = jest.fn();
        render(
            <ToggleItemButton
                color={MUIColor.Success}
                variant={MUIVariant.Soft}
                onClick={onClickSpy}
            />
        );
        fireEvent.click(screen.getByLabelText('Complete item button'));
        expect(onClickSpy).toHaveBeenCalledTimes(1);
    })
});
