import {
    FilterByNewer,
    FilterByOlder,
    FilterByCompleted,
} from 'src/components';

function FilterByTypeSection() {
    return (
        <div className='flex'>
            <div className='mr-2'><FilterByNewer /></div>
            <div className='mr-2'><FilterByOlder /></div>
            <FilterByCompleted />
        </div>
    );
}

export default FilterByTypeSection;