import { useState } from 'react';

import { useAppDispatch } from 'src/app/hooks';
import { todoItemAdded } from 'src/features/todoItems/todoItemsSlice';

import moment from 'moment';
import uniqid from 'uniqid';

import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import AddItemButton from './AddItemButton';

function AddItemFieldBar() {

    const INITIAL_TEXT_STATE = '';
    const dispatch = useAppDispatch();

    // TODO - Additions
    // Adding a number count?
    // Check for empty string
    const [text, setText] = useState(INITIAL_TEXT_STATE);

    const onAddItem = () => {
        dispatch(todoItemAdded({
            id: uniqid(),
            text,
            createdAt: moment().toDate(),
        }));

        setText(INITIAL_TEXT_STATE);
    };

    return (
        <div className='flex'>
            <Input
                className='flex-1'
                placeholder='Add to-do item...'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className='ml-2'>
                {/*
                <Tooltip title='Add item' variant='solid' placement='top'>
                    <IconButton
                        variant='solid'
                        aria-label='Add to-do item button'
                        onClick={onAddItem}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                */}
                <AddItemButton onClick={onAddItem} />
            </div>
        </div>
    );
}

export default AddItemFieldBar;