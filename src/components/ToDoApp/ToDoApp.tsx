import {
    AddItemFieldBar,
    ToDoList
} from 'src/components';

function ToDoApp() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-96 lg:w-4/12 h-3/4 bg-slate-300 backdrop-blur-sm">
                <AddItemFieldBar />
                <ToDoList />
            </div>
        </div>
    );
}

export default ToDoApp;