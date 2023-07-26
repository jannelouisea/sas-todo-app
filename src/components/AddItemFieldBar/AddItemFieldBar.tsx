import { useState } from 'react';

import { useAppDispatch } from 'src/app/hooks';
import { todoItemAdded } from 'src/features/todoItems/todoItemsSlice';

import moment from 'moment';
import uniqid from 'uniqid';

import Input from '@mui/joy/Input';
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
                className='flex-1 drop-shadow-xl'
                placeholder='Add a to-do item...'
                size='lg'
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ borderRadius: '4rem' }}
            />
            <div className='ml-2'>
                <AddItemButton onClick={onAddItem} />
            </div>
        </div>
    );
}

export default AddItemFieldBar;