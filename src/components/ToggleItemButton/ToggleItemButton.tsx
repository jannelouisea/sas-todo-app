import IconButton from '@mui/joy/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import PropTypes from 'prop-types';

import { todoItemToggled, todoItemsSorted } from 'src/features/todoItems/todoItemsSlice'
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

import {
    MUIColor,
    MUIVariant,
    MUISize
} from 'src/static/enums'

type Props = {
    itemId: string,
    color: MUIColor,
    variant: MUIVariant,
}

function ToggleItemButton({ itemId, color, variant }: Props) {
    const dispatch = useAppDispatch();
    const sortBy = useAppSelector(state => state.todoItemsFilters.sortBy);

    const toggleItem = () => {
        dispatch(todoItemToggled(itemId));
        dispatch(todoItemsSorted(sortBy));
    }

    return (
        <IconButton
            color={color}
            id='complete-item-button'
            variant={variant}
            aria-label='Complete item button'
            onClick={toggleItem}
            sx={{ borderRadius: '50%' }}
            size={MUISize.Small}
        >
            <DoneIcon fontSize='inherit' />
        </IconButton>
    );
}

ToggleItemButton.propTypes = {
    itemId: PropTypes.string,
    color: PropTypes.oneOf([...Object.values(MUIColor)]),
    variant: PropTypes.oneOf([...Object.values(MUIVariant)]),
}

ToggleItemButton.defaultProps = {
    color: MUIColor.Primary,
    variant: MUIVariant.Outlined,
}

export default ToggleItemButton;