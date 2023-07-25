import { render } from '@testing-library/react';
import ToDoList from './ToDoList';

test('renders component', () => {
    render(<ToDoList />);
    expect(true).toBeTruthy();
});
