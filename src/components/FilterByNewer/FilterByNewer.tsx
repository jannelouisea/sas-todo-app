import {
    FilterByButton
} from 'src/components'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PropTypes from 'prop-types';
import {
    MUIColor,
    MUIFontSize
} from 'src/static/enums'

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
        color={MUIColor.Primary}
        startIcon={<HourglassTopIcon fontSize={MUIFontSize.Small} />}
        filterEnabled={showNewer}
        onClick={onToggleFilter}
        ariaLabel='Filter by newer'
    />;
}

FilterByNewer.propTypes = {
    className: PropTypes.string,
}

FilterByNewer.defaultProps = {
    className: ''
}

export default FilterByNewer;