import React from 'react';
import './App.css';
import {
    ToDoList
} from 'src/components'
import { Provider } from 'react-redux';
import { store } from 'src/app/store';

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ToDoList />
            </Provider>
        </React.StrictMode>
    );
}

export default App;
