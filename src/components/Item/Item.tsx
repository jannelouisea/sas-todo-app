import Card from '@mui/joy/Card';
import PropTypes from 'prop-types';

import { isOlderItem as isOlderItemUtil } from 'src/utils';
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
    const isOlderItem: boolean = isOlderItemUtil(item) && !item.completed;
    const color: MUIColor = item.completed ? MUIColor.Success : isOlderItem ? MUIColor.Warning : MUIColor.Primary;
    const cardVariant: MUIVariant = item.completed ? MUIVariant.Soft : MUIVariant.Outlined;
    const buttonVariant: MUIVariant = item.completed ? MUIVariant.Solid : MUIVariant.Outlined;

    return (
        <Card
            className='drop-shadow'
            color={color}
            variant={cardVariant}
            size={MUISize.Small}
            sx={{
                borderRadius: '2rem',
                border: isOlderItem ? `1px solid #D4A72C` : ''
            }}
        >
            <div className="flex items-center group">
                <div className="ml-1 mr-4">
                    <ToggleItemButton itemId={item.id} color={color} variant={buttonVariant} />
                </div>
                <div className="flex-1">
                    <span>{item.text}</span>
                    <ItemCreatedDate createdAt={item.createdAt} isCompleted={item.completed} isOlder={isOlderItem} />
                </div>
                <div className="ml-4 mr-2 invisible group-hover:visible">
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