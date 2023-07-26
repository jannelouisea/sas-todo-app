import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

import { useAppDispatch } from 'src/app/hooks'
import { todoItemToggled } from 'src/features/todoItems/todoItemsSlice'
import moment from 'moment';

import {
    IToDoItem
} from 'src/interfaces/'

type Props = {
    item: IToDoItem
}

function Item({ item }: Props) {
    const dispatch = useAppDispatch();

    const isOlderItem = moment().diff(item.createdAt, 'days') > 5;
    const color = item.completed ? 'success' : isOlderItem ? 'warning' : 'primary';
    const cardVariant = item.completed ? 'soft' : 'outlined';
    const buttonVariant = item.completed ? 'solid' : 'outlined';

    const onToggleItem = (id: string) => {
        dispatch(todoItemToggled(id));
    }

    return (
        <Card className='drop-shadow-lg' color={color} variant={cardVariant} size='sm' sx={{ borderRadius: '2rem' }}>
            <div className="flex items-center">
                <div className="ml-1 mr-4">
                    <IconButton
                        color={color}
                        id='complete-item-button'
                        variant={buttonVariant}
                        aria-label='Complete item button'
                        onClick={() => onToggleItem(item.id)}
                        sx={{ borderRadius: '50%' }}
                        size='sm'
                    >
                        <DoneIcon fontSize='inherit' />
                    </IconButton>
                </div>
                <span className="flex-1">{item.text}</span>
                <div className="ml-4 mr-1">
                    <IconButton
                        color={color}
                        id='complete-item-button'
                        variant='plain'
                        aria-label='Complete item button'
                        onClick={() => console.log('hello')}
                        size='sm'
                    >
                        <DeleteIcon fontSize='medium' />
                    </IconButton>
                </div>
            </div>
        </Card>
    );
}

Item.propTypes = {
    onClick: PropTypes.object
}

export default Item;