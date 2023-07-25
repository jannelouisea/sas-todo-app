import React from 'react';
import './App.css';
import {
    ToDoApp
} from 'src/components'
import { Provider } from 'react-redux';
import { store } from 'src/app/store';

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ToDoApp />
            </Provider>
        </React.StrictMode>
    );
}

export default App;
