import {
    AddItemFieldBar,
    ToDoList
} from 'src/components';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import SearchIcon from '@mui/icons-material/Search';

function ToDoApp() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-96 lg:w-5/12 h-5/6 backdrop-blur-xl bg-white/30 p-8 rounded-lg drop-shadow-2xl">
                <div className='mb-4'>
                    <Input
                        className='flex-1 drop-shadow-xl'
                        placeholder='Search to-do items...'
                        size='lg'
                        //value={text}
                        //onChange={(e) => setText(e.target.value)}
                        startDecorator={<SearchIcon sx={{ color: 'text.tertiary' }} />}
                        sx={{ borderRadius: '4rem' }}
                    />
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