import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { todoItemAdded, todoItemsSorted } from 'src/features/todoItems/todoItemsSlice';

import moment from 'moment';
import uniqid from 'uniqid';

import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { AddItemButton } from 'src/components';

import {
    MUISize,
    MUIVariant,
    MUIText,
    MUIColor,
} from 'src/static/enums';

function AddItemFieldBar() {
    const INITIAL_TEXT_STATE = '';
    const IS_TEXT_EMPTY_ERR_MSG = 'To-do item cannot be blank.';
    const PLACEHOLDER = 'What do I need to-do?';

    const dispatch = useAppDispatch();
    const sortBy = useAppSelector(state => state.todoItemsFilters.sortBy);

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
        if (text !== '') {
            dispatch(todoItemAdded({
                id: uniqid(),
                text,
                createdAt: moment().toDate(),
            }));
            dispatch(todoItemsSorted(sortBy));
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

    const muiInputStyles = { borderRadius: '4rem' };
    const muiErrStyles = { marginTop: '.25rem', paddingLeft: '1.5rem' };

    return (
        <div className='add-item-field-bar'>
            <div className='add-item-input'>
                <Input
                    className='drop-shadow'
                    placeholder={PLACEHOLDER}
                    size={MUISize.Large}
                    value={text}
                    onChange={onTextChanged}
                    onBlur={onInputBlur}
                    sx={muiInputStyles}
                    error={hasError}
                    aria-label='Add to-do item input field'
                />
                {
                    hasError &&
                    <Typography
                        color={MUIColor.Danger}
                        level={MUIText.Label}
                        variant={MUIVariant.Plain}
                        sx={muiErrStyles}
                    >
                        {IS_TEXT_EMPTY_ERR_MSG}
                    </Typography>
                }
            </div>
            <div className='add-item-button'>
                <AddItemButton onClick={onAddItem} />
            </div>
        </div>
    );
}

export default AddItemFieldBar;