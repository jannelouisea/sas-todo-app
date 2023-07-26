import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { searchTermChanged } from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    const searchTerm = useAppSelector(state => state.todoItemsFilters.searchTerm);
    const dispatch = useAppDispatch();

    // TODO - Add a debounce function here
    const onSearchTermChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchTermChanged(evt.target.value));
    }

    return (
        <Input
            className='flex-1 drop-shadow-xl'
            placeholder='Search to-do items...'
            size='lg'
            value={searchTerm}
            onChange={onSearchTermChanged}
            startDecorator={<SearchIcon sx={{ color: 'text.tertiary' }} />}
            sx={{ borderRadius: '4rem' }}
        />
    );
}

export default SearchBar;