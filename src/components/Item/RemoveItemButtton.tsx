import IconButton from '@mui/joy/IconButton';
import Delete from '@mui/icons-material/Delete';

import { useAppDispatch } from 'src/app/hooks';
import { todoItemRemoved } from 'src/features/todoItems/todoItemsSlice';

import {
    MUIColor
} from 'src/static/enums'

type Props = {
    itemId: string,
    color: MUIColor
}

function RemoveItemButtton({ itemId, color }: Props) {
    const dispatch = useAppDispatch();

    const onRemove = () => {
        dispatch(todoItemRemoved(itemId));
    }

    return (
        <IconButton
            id='remove-item-button'
            aria-label='Remove item button'
            onClick={onRemove}
            size='sm'
            variant='plain'
            color={color}
        >
            <Delete sx={{ color: 'inherit' }} />
        </IconButton>
    );
}

export default RemoveItemButtton;