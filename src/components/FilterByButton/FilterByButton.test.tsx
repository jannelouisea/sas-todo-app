import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterByButton from './FilterByButton';
import { JoyUIColor } from 'src/static/enums';

describe('FilterByButton', () => {
    const labelTextId = 'Filter by button';

    it('renders correctly with default props', () => {
        const tree = renderer.create(
            <FilterByButton
                label='foo'
                color={JoyUIColor.Primary}
                onClick={() => { }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when filter enabled', () => {
        const tree = renderer.create(
            <FilterByButton
                label='foo'
                color={JoyUIColor.Primary}
                onClick={() => { }}
                filterEnabled={true}
                className='foo'
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when filter disabled', () => {
        const tree = renderer.create(
            <FilterByButton
                label='foo'
                color={JoyUIColor.Primary}
                onClick={() => { }}
                filterEnabled={false}
                className='foo'
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('calls onClick prop function on click', () => {
        const onClickSpy = jest.fn();

        render(
            <FilterByButton
                label='foo'
                color={JoyUIColor.Primary}
                onClick={onClickSpy}
            />
        );

        const button = screen.getByLabelText(labelTextId);
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

});