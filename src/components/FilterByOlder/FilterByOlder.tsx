import {
    FilterByButton
} from 'src/components'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {
    MUIColor,
    MUIFontSize
} from 'src/static/enums'

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { showOlderToggled } from 'src/features/todoItemsFilters/todoItemsFiltersSlice';
import PropTypes from 'prop-types';

type Props = {
    className: string
}

function FilterByOlder({ className }: Props) {
    const showOlder = useAppSelector(state => state.todoItemsFilters.showOlder);
    const dispatch = useAppDispatch();

    const onToggleFilter = () => {
        dispatch(showOlderToggled());
    }

    return <FilterByButton
        className={className}
        label='Older'
        color={MUIColor.Warning}
        startIcon={<HourglassBottomIcon fontSize={MUIFontSize.Small} />}
        filterEnabled={showOlder}
        onClick={onToggleFilter}
        ariaLabel='Filter by older'
    />;
}

FilterByOlder.propTypes = {
    className: PropTypes.string,
}

FilterByOlder.defaultProps = {
    className: ''
}

export default FilterByOlder;