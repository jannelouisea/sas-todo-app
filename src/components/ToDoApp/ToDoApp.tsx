import {
    AddItemFieldBar,
    ToDoList,
    SearchBar,
} from 'src/components';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import SearchIcon from '@mui/icons-material/Search';

function ToDoApp() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-96 sm:w-9/12 md:w-9/12 lg:w-9/12 max-w-2xl h-5/6 backdrop-blur-xl bg-white/30 p-8 rounded-lg drop-shadow-2xl">
                <div className='mb-4'>
                    <SearchBar />
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