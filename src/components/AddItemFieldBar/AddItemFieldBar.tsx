import { useState, useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { todoItemAdded } from 'src/features/todoItems/todoItemsSlice';

import moment from 'moment';
import uniqid from 'uniqid';

import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import AddItemButton from './AddItemButton';

function AddItemFieldBar() {

    const INITIAL_TEXT_STATE = '';
    const IS_TEXT_EMPTY_ERR_MSG = 'To-do item cannot be empty.'
    const dispatch = useAppDispatch();

    const [text, setText] = useState(INITIAL_TEXT_STATE);
    const [textChanged, setTextChanged] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const isEmpty = textChanged && text === '';
        setHasError(isEmpty);
    }, [text, textChanged]);

    const onTextChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setTextChanged(true);
        setText(evt.target.value);
    }

    const onAddItem = () => {
        const isEmpty = text === '';

        if (!isEmpty) {
            dispatch(todoItemAdded({
                id: uniqid(),
                text,
                createdAt: moment().toDate(),
            }));

            resetState();
        } else {
            setHasError(true);
        }
    };

    const onInputBlur = () => {
        setTextChanged(false);
    }

    const resetState = () => {
        setTextChanged(false);
        setText(INITIAL_TEXT_STATE);
    };

    return (
        <div className='flex'>
            <div className='flex-1'>
                <Input
                    className='drop-shadow-xl'
                    placeholder='Add a to-do item...'
                    size='lg'
                    value={text}
                    onChange={onTextChanged}
                    onBlur={onInputBlur}
                    sx={{ borderRadius: '4rem' }}
                    error={hasError}
                />
                {hasError && <Typography color='danger' level='body3' variant='plain' sx={{ marginTop: '.25rem', paddingLeft: '1.5rem' }}>{IS_TEXT_EMPTY_ERR_MSG}</Typography>}
            </div>
            <div className='ml-2'>
                <AddItemButton onClick={onAddItem} />
            </div>
        </div>
    );
}

export default AddItemFieldBar;