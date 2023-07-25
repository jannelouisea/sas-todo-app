import {
    IToDoItem
} from 'src/interfaces'
import moment from 'moment';
import reducer, { todoItemAdded, todoItemToggled } from './todoItemsSlice'

describe('todoItemsSlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual([]);
    });

    it('should handle an item added to an new list', () => {
        const previousState: IToDoItem[] = [];

        const id = 'todo-item-001';
        const text = 'Clean dishes';
        const createdAt = moment().toDate();

        const newState: IToDoItem[] = [{
            id,
            text,
            createdAt,
            completed: false,
        }];

        expect(reducer(previousState, todoItemAdded({ id, text, createdAt }))).toEqual(newState);
    });

    it('should handle an item added to a existing list', () => {
        const createdAt01 = moment().toDate();
        const previousState: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: createdAt01,
                completed: true,
            }
        ];

        const id = 'todo-item-002';
        const text = 'Clean dishes';
        const createdAt = moment().toDate();

        const newState: IToDoItem[] = [
            {
                id,
                text,
                createdAt,
                completed: false,
            },
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: createdAt01,
                completed: true,
            },
        ];

        expect(reducer(previousState, todoItemAdded({ id, text, createdAt }))).toEqual(newState);
    });

    it('should handle an item toggled completed to true', () => {
        const id = 'todo-item-001';
        const createdAt = moment().toDate();
        const previousState: IToDoItem[] = [
            {
                id,
                text: 'Walk the dog',
                createdAt,
                completed: false,
            }
        ];
        const newState: IToDoItem[] = [
            {
                id,
                text: 'Walk the dog',
                createdAt,
                completed: true,
            }
        ];

        expect(reducer(previousState, todoItemToggled(id))).toEqual(newState);
    });

    it('should handle an item toggled completed to false', () => {
        const id = 'todo-item-001';
        const createdAt = moment().toDate();
        const previousState: IToDoItem[] = [
            {
                id,
                text: 'Walk the dog',
                createdAt,
                completed: true,
            }
        ];
        const newState: IToDoItem[] = [
            {
                id,
                text: 'Walk the dog',
                createdAt,
                completed: false,
            }
        ];

        expect(reducer(previousState, todoItemToggled(id))).toEqual(newState);
    });

    it('should handle unchanged todo list when id doesn\'t exist', () => {
        const state: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: moment().toDate(),
                completed: true,
            }
        ];

        expect(reducer(state, todoItemToggled('does-not-exist'))).toEqual(state);
    });

    it('should handle unchanged todo list when id is an empty string', () => {
        const state: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: moment().toDate(),
                completed: true,
            }
        ];

        expect(reducer(state, todoItemToggled(''))).toEqual(state);
    });
});

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual([]);
});