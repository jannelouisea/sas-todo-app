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
        <div className="to-do-app">
            <div className="to-do-app_content">
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