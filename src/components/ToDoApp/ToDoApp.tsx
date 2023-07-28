import {
    AddItemFieldBar,
    ToDoList,
    SearchBar,
    FilterByTypeSection,
    SortByDropdown,
} from 'src/components';

import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';

function ToDoApp() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-96 sm:w-9/12 md:w-9/12 lg:w-9/12 max-w-3xl h-5/6 backdrop-blur-xl bg-zinc-100/60 p-8 rounded-lg drop-shadow-2xl flex flex-col">
                <div className='mb-4'>
                    <SearchBar className='mb-4' />
                    <div className='flex flex-wrap'>
                        <div className='flex-1 mb-1'>
                            <Typography color='neutral' level='body3' variant='plain' sx={{ marginBottom: '.25rem' }}>Filter by</Typography>
                            <FilterByTypeSection />
                        </div>
                        <div className='flex flex-col items-start md:items-end'>
                            <Typography color='neutral' level='body3' variant='plain' sx={{ marginBottom: '.25rem' }}>Sort by</Typography>
                            <SortByDropdown />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='mb-4'></div>
                <AddItemFieldBar />
                <div className='flex-1 mt-4 overflow-hidden overflow-y-auto no-scrollbar'>
                    <ToDoList />
                </div>
            </div>
        </div>
    );
}

export default ToDoApp;