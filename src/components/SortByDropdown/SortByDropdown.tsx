import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { ISortByItem } from 'src/interfaces';
import { Sort } from 'src/static/enums';

import { useAppDispatch } from 'src/app/hooks';
import { todoItemsSorted } from 'src/features/todoItems/todoItemsSlice';
import { sortByChanged } from 'src/features/todoItemsFilters/todoItemsFiltersSlice';

function SortByDropdown() {
    const sortByOptions: ISortByItem[] = [
        {
            value: Sort.Incmpl1st,
            label: 'Incomplete first'
        },
        {
            value: Sort.Cmpl1st,
            label: 'Completed first'
        },
        {
            value: Sort.DateAsc,
            label: 'Created date (Asc)'
        },
        {
            value: Sort.DateDesc,
            label: 'Created date (Desc)'
        },
        {
            value: Sort.TextAsc,
            label: 'Text (A to Z)'
        },
        {
            value: Sort.TextDesc,
            label: 'Text (Z to A)'
        },
    ];

    const dispatch = useAppDispatch();

    const onSelectChange = (evt: React.SyntheticEvent | null, newValue: string | null) => {
        dispatch(sortByChanged(newValue as Sort));
        dispatch(todoItemsSorted(newValue as Sort));
    }

    return (
        <Select
            defaultValue={Sort.Incmpl1st}
            onChange={onSelectChange}
            slotProps={{
                root: {
                    sx: {
                        minHeight: '2rem',
                        maxHeight: '2rem'
                    }
                },
            }}
        >
            {
                sortByOptions.map((option: ISortByItem, index: number) =>
                    <Option key={`sort-by-${index}`} value={option.value}>
                        {option.label}
                    </Option>
                )
            }
        </Select>
    );
}

export default SortByDropdown;