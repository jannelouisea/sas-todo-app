import {
    AddItemFieldBar,
    ToDoList
} from 'src/components';

function ToDoApp() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-96 lg:w-5/12 h-5/6 backdrop-blur-xl bg-white/30 p-8 rounded-lg drop-shadow-2xl">
                <AddItemFieldBar />
                <div className='mt-4'>
                    <ToDoList />
                </div>
            </div>
        </div>
    );
}

export default ToDoApp;