import {
    FilterByNewer,
    FilterByOlder,
    FilterByCompleted,
} from 'src/components';

function FilterByTypeSection() {
    return (
        <div className='flex'>
            <FilterByNewer className='mr-2' />
            <FilterByOlder className='mr-2' />
            <FilterByCompleted className='mr-2' />
        </div>
    );
}

export default FilterByTypeSection;