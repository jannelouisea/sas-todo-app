import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { searchTermChanged } from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import classname from 'classnames';

type Props = {
    className: string,
}

function SearchBar({ className }: Props) {
    const inputClassName = classname('flex-1 drop-shadow-xl', className);

    const searchTerm = useAppSelector(state => state.todoItemsFilters.searchTerm);
    const dispatch = useAppDispatch();

    // TODO - Add a debounce function here
    const onSearchTermChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchTermChanged(evt.target.value));
    }

    return (
        <Input
            className={inputClassName}
            placeholder='Search to-do items...'
            size='lg'
            value={searchTerm}
            onChange={onSearchTermChanged}
            startDecorator={<SearchIcon sx={{ color: 'text.tertiary' }} />}
            sx={{ borderRadius: '4rem' }}
        />
    );
}

SearchBar.propTypes = {
    className: PropTypes.string,
}

SearchBar.defaultProps = {
    className: '',
}

export default SearchBar;