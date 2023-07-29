import {
    AddItemFieldBar,
    ToDoList,
    SearchBar,
    FilterByTypeSection,
    SortByDropdown,
} from 'src/components';
import Divider from '@mui/joy/Divider';

function ToDoApp() {
    return (
        <div className="to-do-app w-screen h-screen flex justify-center items-center">
            <div className="w-96 sm:w-9/12 md:w-9/12 lg:w-9/12 max-w-3xl h-5/6 backdrop-blur-xl bg-zinc-100/60 p-8 rounded-lg drop-shadow-2xl flex flex-col">
                <div className='to-do-app_section'>
                    <SearchBar className='to-do-app_section' />
                    <div className='to-do-app_filter-and-sort'>
                        <FilterByTypeSection className='to-do-app_filter-section' />
                        <SortByDropdown />
                    </div>
                </div>
                <div className='to-do-app_section'><Divider /></div>
                <AddItemFieldBar className='to-do-app_section' />
                <ToDoList />
            </div>
        </div>
    );
}

export default ToDoApp;