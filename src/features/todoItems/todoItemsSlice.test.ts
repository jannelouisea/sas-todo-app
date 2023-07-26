import {
    IToDoItem
} from 'src/interfaces'
import moment from 'moment';
import reducer, { todoItemAdded, todoItemToggled } from './todoItemsSlice'

describe('todoItemsSlice', () => {
    it('should return the initial state', () => {
        const initState = reducer(undefined, { type: undefined });

        expect(initState[0].id).toEqual('init-item-001');
        expect(initState[0].text).toEqual('Clean the house');
        expect(initState[0].completed).toBeFalsy();

        expect(initState[1]).toEqual({
            id: 'init-item-002',
            text: 'Pack things for upcoming trip',
            createdAt: moment('2023-07-18').toDate(),
            completed: false
        });

        expect(initState[2]).toEqual({
            id: 'init-item-003',
            text: 'Make dinner',
            createdAt: moment('2023-07-25').toDate(),
            completed: true
        });

        expect(initState[3]).toEqual({
            id: 'init-item-004',
            text: 'Prepare for SAS Interview',
            createdAt: moment('2023-07-15').toDate(),
            completed: true
        });
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