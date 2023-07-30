import Card from '@mui/joy/Card';
import PropTypes from 'prop-types';

import { isOlderItemUtil } from 'src/utils';
import {
    IToDoItem
} from 'src/interfaces/'
import {
    RemoveItemButtton,
    ToggleItemButton,
    ItemCreatedDate
} from 'src/components'
import {
    MUIColor,
    MUIVariant,
    MUISize
} from 'src/static/enums'

type Props = {
    item: IToDoItem
}

function Item({ item }: Props) {
    const OLDER_ITEM_BORDER = '#D4A72C';
    const isOlderItem: boolean = isOlderItemUtil(item) && !item.completed;
    const color: MUIColor = item.completed ? MUIColor.Success : isOlderItem ? MUIColor.Warning : MUIColor.Primary;
    const cardVariant: MUIVariant = item.completed ? MUIVariant.Soft : MUIVariant.Outlined;
    const buttonVariant: MUIVariant = item.completed ? MUIVariant.Solid : MUIVariant.Outlined;

    const muiCardStyles = {
        borderRadius: '2rem',
        border: isOlderItem ? `1px solid ${OLDER_ITEM_BORDER}` : ''
    };

    return (
        <Card
            className='drop-shadow'
            color={color}
            variant={cardVariant}
            size={MUISize.Small}
            sx={muiCardStyles}
        >
            <div className="to-do-item">
                <div className="to-do-item_toggle">
                    <ToggleItemButton itemId={item.id} color={color} variant={buttonVariant} />
                </div>
                <div className="to-do-item_text">
                    <span>{item.text}</span>
                    <ItemCreatedDate createdAt={item.createdAt} isCompleted={item.completed} isOlder={isOlderItem} />
                </div>
                <div className="to-do-item_remove-btn">
                    <RemoveItemButtton itemId={item.id} color={color} />
                </div>
            </div>
        </Card>
    );
}

Item.propTypes = {
    onClick: PropTypes.object
}

export default Item;