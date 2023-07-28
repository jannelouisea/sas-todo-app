import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { todoItemToggled, todoItemsSorted } from 'src/features/todoItems/todoItemsSlice'
import { isOlderItem as isOlderItemUtil } from 'src/utils';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import classNames from 'classnames';

import {
    IToDoItem
} from 'src/interfaces/'
import {
    RemoveItemButtton,
    ToggleItemButton
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
    const dispatch = useAppDispatch();

    const sortBy = useAppSelector(state => state.todoItemsFilters.sortBy);

    const isOlderItem: boolean = isOlderItemUtil(item) && !item.completed;
    const color: MUIColor = item.completed ? MUIColor.Success : isOlderItem ? MUIColor.Warning : MUIColor.Primary;
    const cardVariant: MUIVariant = item.completed ? MUIVariant.Soft : MUIVariant.Outlined;
    const buttonVariant: MUIVariant = item.completed ? MUIVariant.Solid : MUIVariant.Outlined;

    const isOlderIconClassNames = classNames('mr-1', { 'hidden': item.completed || (!isOlderItem) });

    const onToggleItem = (id: string) => {
        dispatch(todoItemToggled(id));
        dispatch(todoItemsSorted(sortBy));
    }

    return (
        <Card
            className='drop-shadow-lg'
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
                    <ToggleItemButton
                        color={color}
                        variant={buttonVariant}
                        onClick={() => onToggleItem(item.id)}
                    />
                </div>
                <div className="flex-1">
                    <span>{item.text}</span>
                    <div className='flex items-center'>
                        <div className={isOlderIconClassNames}>
                            <HourglassBottomIcon sx={{ fontSize: '1rem' }} />
                        </div>
                        <div className='ml-1'>
                            <Typography
                                textColor={item.completed ? 'neutral.700' : 'neutral.500'}
                                level='body3'
                                variant={MUIVariant.Plain}
                                sx={{ padding: 0, paddingTop: '.25rem' }}
                            >
                                {`Created ${moment(item.createdAt).format('lll')}`}
                            </Typography>
                        </div>
                    </div>
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