import IconButton from '@mui/joy/IconButton';
import Delete from '@mui/icons-material/Delete';
import Tooltip from '@mui/joy/Tooltip';

import { useAppDispatch } from 'src/app/hooks';
import { todoItemRemoved } from 'src/features/todoItems/todoItemsSlice';

import {
    MUIColor,
    MUISize,
    MUIVariant,
    MUIPos,
    MUIIconColor
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
        <Tooltip title='Remove item' size={MUISize.Medium} variant={MUIVariant.Outlined} placement={MUIPos.Right}>
            <IconButton
                id='remove-item-button'
                aria-label='Remove item button'
                onClick={onRemove}
                size={MUISize.Small}
                variant={MUIVariant.Plain}
                color={color}
            >
                <Delete sx={{ color: MUIIconColor.Inherit }} />
            </IconButton>
        </Tooltip>
    );
}

export default RemoveItemButtton;