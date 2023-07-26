import {
    AddItemFieldBar,
    ToDoList,
    SearchBar,
    FilterByNewer,
    FilterByOlder,
    FilterByCompleted,
    FilterByTypeSection,
} from 'src/components';
import Divider from '@mui/joy/Divider';

function ToDoApp() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-96 sm:w-9/12 md:w-9/12 lg:w-9/12 max-w-2xl h-5/6 backdrop-blur-xl bg-white/30 p-8 rounded-lg drop-shadow-2xl">
                <div className='mb-4'>
                    <SearchBar className='mb-4' />
                    <FilterByTypeSection />
                </div>
                <Divider />
                <div className='mb-4'></div>
                <AddItemFieldBar />
                <div className='mt-4'>
                    <ToDoList />
                </div>
            </div>
        </div>
    );
}

export default ToDoApp;