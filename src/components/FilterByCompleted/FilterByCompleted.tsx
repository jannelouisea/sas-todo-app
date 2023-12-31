import {
    FilterByButton
} from 'src/components'
import DoneIcon from '@mui/icons-material/Done';
import PropTypes from 'prop-types';
import {
    MUIColor,
    MUIFontSize
} from 'src/static/enums'

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { showCompletedToggled } from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

type Props = {
    className: string
}

function FilterByCompleted({ className }: Props) {
    const showCompleted = useAppSelector(state => state.todoItemsFilters.showCompleted);
    const dispatch = useAppDispatch();

    const onToggleFilter = () => {
        dispatch(showCompletedToggled());
    }

    return <FilterByButton
        className={className}
        label='Completed'
        color={MUIColor.Success}
        startIcon={<DoneIcon fontSize={MUIFontSize.Small} />}
        filterEnabled={showCompleted}
        onClick={onToggleFilter}
        ariaLabel='Filter by completed'
    />;
}

FilterByCompleted.propTypes = {
    className: PropTypes.string,
}

FilterByCompleted.defaultProps = {
    className: ''
}

export default FilterByCompleted;