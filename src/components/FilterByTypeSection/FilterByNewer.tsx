import {
    FilterByButton
} from 'src/components'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PropTypes from 'prop-types';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { showNewerToggled } from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

type Props = {
    className: string
}

function FilterByNewer({ className }: Props) {
    const showNewer = useAppSelector(state => state.todoItemsFilters.showNewer);
    const dispatch = useAppDispatch();

    const onToggleFilter = () => {
        dispatch(showNewerToggled());
    }

    return <FilterByButton
        className={className}
        label='Newer'
        color='primary'
        startIcon={<HourglassTopIcon fontSize='small' />}
        filterEnabled={showNewer}
        onClick={onToggleFilter}
    />;
}

FilterByNewer.propTypes = {
    className: PropTypes.string,
}

FilterByNewer.defaultProps = {
    className: ''
}

export default FilterByNewer;