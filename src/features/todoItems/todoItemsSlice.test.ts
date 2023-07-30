import {
    IToDoItem
} from 'src/interfaces'
import moment from 'moment';
import reducer, { todoItemAdded, todoItemToggled, todoItemRemoved } from './todoItemsSlice'

describe('todoItemsSlice', () => {
    it('should return the initial state', () => {
        const initState = reducer(undefined, { type: undefined });

        expect(initState[0].id).toEqual('init-item-001');
        expect(initState[0].text).toEqual('Clean the house');
        expect(initState[0].completed).toBeFalsy();

        expect(initState[1]).toEqual({
            id: 'init-item-002',
            text: 'Pack things for upcoming trip',
            createdAt: 1689652800,
            completed: false
        });

        expect(initState[2]).toEqual({
            id: 'init-item-003',
            text: 'Make dinner',
            createdAt: 1690257600,
            completed: true
        });

        expect(initState[3]).toEqual({
            id: 'init-item-004',
            text: 'Prepare for SAS Interview',
            createdAt: 1689393600,
            completed: true
        });
    });

    it('should handle an item added to an new list', () => {
        const previousState: IToDoItem[] = [];

        const id = 'todo-item-001';
        const text = 'Clean dishes';
        const createdAt = moment().unix();

        const newState: IToDoItem[] = [{
            id,
            text,
            createdAt,
            completed: false,
        }];

        expect(reducer(previousState, todoItemAdded({ id, text, createdAt }))).toEqual(newState);
    });

    it('should handle an item added to a existing list', () => {
        const createdAt01 = moment().unix();
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
        const createdAt = moment().unix();

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
        const createdAt = moment().unix();
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
        const createdAt = moment().unix();
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

    it('should handle unchanged todo list when id doesn\'t exist for toggle', () => {
        const state: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: moment().unix(),
                completed: true,
            }
        ];

        expect(reducer(state, todoItemToggled('does-not-exist'))).toEqual(state);
    });

    it('should handle unchanged todo list when id is an empty string for toggle', () => {
        const state: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: moment().unix(),
                completed: true,
            }
        ];

        expect(reducer(state, todoItemToggled(''))).toEqual(state);
    });

    it('should handle removed todo item for non-empty list', () => {
        const createdAt = moment().unix();
        const removeItemId = 'todo-item-002';
        const previousState: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: createdAt,
                completed: true,
            },
            {
                id: removeItemId,
                text: 'Clean dishes',
                createdAt: createdAt,
                completed: true,
            },
        ];

        const newState: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: createdAt,
                completed: true,
            },
        ];

        const res = reducer(previousState, todoItemRemoved(removeItemId));
        expect(res.length).toBe(previousState.length - 1);
        expect(res).toEqual(newState);
    });

    it('should handle removed todo item for empty list', () => {
        const state: IToDoItem[] = [];

        expect(reducer(state, todoItemRemoved(''))).toEqual(state);
    });

    it('should handle unchanged todo list when id doesn\'t exist for remove', () => {
        const state: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: moment().unix(),
                completed: true,
            }
        ];

        expect(reducer(state, todoItemRemoved('does-not-exist'))).toEqual(state);
    });

    it('should handle unchanged todo list when id is an empty string for remove', () => {
        const state: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Walk the dog',
                createdAt: moment().unix(),
                completed: true,
            }
        ];

        expect(reducer(state, todoItemRemoved(''))).toEqual(state);
    });
});