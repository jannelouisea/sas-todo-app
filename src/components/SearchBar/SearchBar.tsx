import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { searchTermChanged } from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

import { MUISize } from 'src/static/enums'

import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import classname from 'classnames';

type Props = {
    className: string,
}

function SearchBar({ className }: Props) {
    const searchTerm = useAppSelector(state => state.todoItemsFilters.searchTerm);
    const dispatch = useAppDispatch();

    const onSearchTermChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchTermChanged(evt.target.value));
    };

    const inputClassName = classname('drop-shadow', className);
    const muiInputStyles = { borderRadius: '4rem' };
    const muiIconStyles = { color: 'text.tertiary' };

    return (
        <Input
            className={inputClassName}
            placeholder='Search to-do items...'
            size={MUISize.Large}
            value={searchTerm}
            onChange={onSearchTermChanged}
            startDecorator={<SearchIcon sx={muiIconStyles} />}
            sx={muiInputStyles}
            aria-label='Search to-do items'
        />
    );
}

SearchBar.propTypes = {
    // Styles to apply to the root of the component
    className: PropTypes.string,
}

SearchBar.defaultProps = {
    className: '',
}

export default SearchBar;