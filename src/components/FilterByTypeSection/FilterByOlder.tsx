import {
    FilterByButton
} from 'src/components'
import HourglassBottomIcon from '@mui/icons-material/HourglassTop';

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
        color='warning'
        startIcon={<HourglassBottomIcon fontSize='small' />}
        filterEnabled={showOlder}
        onClick={onToggleFilter}
    />;
}

FilterByOlder.propTypes = {
    className: PropTypes.string,
}

FilterByOlder.defaultProps = {
    className: ''
}

export default FilterByOlder;