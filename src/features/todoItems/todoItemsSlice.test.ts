import {
    IToDoItem
} from 'src/interfaces'
import moment from 'moment';
import reducer, { todoItemAdded, todoItemToggled, todoItemRemoved, todoItemsSorted } from './todoItemsSlice';
import {
    Sort
} from 'src/static/enums';

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

    describe('should handle sorting items', () => {
        const previousState: IToDoItem[] = [
            {
                id: 'todo-item-001',
                text: 'Zoo keeping',
                createdAt: 1689825600, // Thu Jul 20 2023 00:00:00 GMT-0400 (EST)
                completed: true,
            },
            {
                id: 'todo-item-002',
                text: 'Acquire concert tix', // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                createdAt: 1689703200,
                completed: false,
            },
            {
                id: 'todo-item-003',
                text: '123',
                createdAt: 1689825601, // Thu Jul 20 2023 00:00:01 GMT-0400 (EST)
                completed: true,
            },
            {
                id: 'todo-item-004',
                text: 'Apple picking',
                createdAt: 1689703200, // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                completed: false,
            },
            {
                id: 'todo-item-005',
                text: '!! Do laundry',
                createdAt: 1689919200, // Fri Jul 21 2023 02:00:00 GMT-0400 (EST)
                completed: false,
            },
            {
                id: 'todo-item-061',
                text: 'Walk the dog',
                createdAt: 1689825599, // Wed Jul 19 2023 23:59:59 GMT-0400 (EST)
                completed: true,
            },
        ];

        it('by created date desc', () => {
            const newState: IToDoItem[] = [
                {
                    id: 'todo-item-005',
                    text: '!! Do laundry',
                    createdAt: 1689919200, // Fri Jul 21 2023 02:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-003',
                    text: '123',
                    createdAt: 1689825601, // Thu Jul 20 2023 00:00:01 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-001',
                    text: 'Zoo keeping',
                    createdAt: 1689825600, // Thu Jul 20 2023 00:00:00 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-061',
                    text: 'Walk the dog',
                    createdAt: 1689825599, // Wed Jul 19 2023 23:59:59 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-002',
                    text: 'Acquire concert tix', // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    createdAt: 1689703200,
                    completed: false,
                },
                {
                    id: 'todo-item-004',
                    text: 'Apple picking',
                    createdAt: 1689703200, // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    completed: false,
                },
            ];

            expect(reducer(previousState, todoItemsSorted(Sort.DateDesc))).toEqual(newState);
        });

        it('by created date asc', () => {
            const newState: IToDoItem[] = [
                {
                    id: 'todo-item-002',
                    text: 'Acquire concert tix', // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    createdAt: 1689703200,
                    completed: false,
                },
                {
                    id: 'todo-item-004',
                    text: 'Apple picking',
                    createdAt: 1689703200, // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-061',
                    text: 'Walk the dog',
                    createdAt: 1689825599, // Wed Jul 19 2023 23:59:59 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-001',
                    text: 'Zoo keeping',
                    createdAt: 1689825600, // Thu Jul 20 2023 00:00:00 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-003',
                    text: '123',
                    createdAt: 1689825601, // Thu Jul 20 2023 00:00:01 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-005',
                    text: '!! Do laundry',
                    createdAt: 1689919200, // Fri Jul 21 2023 02:00:00 GMT-0400 (EST)
                    completed: false,
                },
            ];

            expect(reducer(previousState, todoItemsSorted(Sort.DateAsc))).toEqual(newState);
        });

        it('by text (a-z)', () => {
            const newState: IToDoItem[] = [
                {
                    id: 'todo-item-005',
                    text: '!! Do laundry',
                    createdAt: 1689919200, // Fri Jul 21 2023 02:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-003',
                    text: '123',
                    createdAt: 1689825601, // Thu Jul 20 2023 00:00:01 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-002',
                    text: 'Acquire concert tix', // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    createdAt: 1689703200,
                    completed: false,
                },
                {
                    id: 'todo-item-004',
                    text: 'Apple picking',
                    createdAt: 1689703200, // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-061',
                    text: 'Walk the dog',
                    createdAt: 1689825599, // Wed Jul 19 2023 23:59:59 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-001',
                    text: 'Zoo keeping',
                    createdAt: 1689825600, // Thu Jul 20 2023 00:00:00 GMT-0400 (EST)
                    completed: true,
                },
            ];

            expect(reducer(previousState, todoItemsSorted(Sort.TextAsc))).toEqual(newState);
        });

        it('by text (z-a)', () => {
            const newState: IToDoItem[] = [
                {
                    id: 'todo-item-001',
                    text: 'Zoo keeping',
                    createdAt: 1689825600, // Thu Jul 20 2023 00:00:00 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-061',
                    text: 'Walk the dog',
                    createdAt: 1689825599, // Wed Jul 19 2023 23:59:59 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-004',
                    text: 'Apple picking',
                    createdAt: 1689703200, // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-002',
                    text: 'Acquire concert tix', // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    createdAt: 1689703200,
                    completed: false,
                },
                {
                    id: 'todo-item-003',
                    text: '123',
                    createdAt: 1689825601, // Thu Jul 20 2023 00:00:01 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-005',
                    text: '!! Do laundry',
                    createdAt: 1689919200, // Fri Jul 21 2023 02:00:00 GMT-0400 (EST)
                    completed: false,
                },
            ];

            expect(reducer(previousState, todoItemsSorted(Sort.TextDesc))).toEqual(newState);
        });

        it('by completed first', () => {
            const newState: IToDoItem[] = [
                {
                    id: 'todo-item-003',
                    text: '123',
                    createdAt: 1689825601, // Thu Jul 20 2023 00:00:01 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-001',
                    text: 'Zoo keeping',
                    createdAt: 1689825600, // Thu Jul 20 2023 00:00:00 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-061',
                    text: 'Walk the dog',
                    createdAt: 1689825599, // Wed Jul 19 2023 23:59:59 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-005',
                    text: '!! Do laundry',
                    createdAt: 1689919200, // Fri Jul 21 2023 02:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-002',
                    text: 'Acquire concert tix', // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    createdAt: 1689703200,
                    completed: false,
                },
                {
                    id: 'todo-item-004',
                    text: 'Apple picking',
                    createdAt: 1689703200, // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    completed: false,
                },
            ];

            expect(reducer(previousState, todoItemsSorted(Sort.Cmpl1st))).toEqual(newState);
        });

        it('by incomplete first', () => {
            const newState: IToDoItem[] = [
                {
                    id: 'todo-item-005',
                    text: '!! Do laundry',
                    createdAt: 1689919200, // Fri Jul 21 2023 02:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-002',
                    text: 'Acquire concert tix', // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    createdAt: 1689703200,
                    completed: false,
                },
                {
                    id: 'todo-item-004',
                    text: 'Apple picking',
                    createdAt: 1689703200, // Tue Jul 18 2023 14:00:00 GMT-0400 (EST)
                    completed: false,
                },
                {
                    id: 'todo-item-003',
                    text: '123',
                    createdAt: 1689825601, // Thu Jul 20 2023 00:00:01 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-001',
                    text: 'Zoo keeping',
                    createdAt: 1689825600, // Thu Jul 20 2023 00:00:00 GMT-0400 (EST)
                    completed: true,
                },
                {
                    id: 'todo-item-061',
                    text: 'Walk the dog',
                    createdAt: 1689825599, // Wed Jul 19 2023 23:59:59 GMT-0400 (EST)
                    completed: true,
                },
            ];

            expect(reducer(previousState, todoItemsSorted(Sort.Incmpl1st))).toEqual(newState);
        });

        it('handles empty list', () => {
            const state: IToDoItem[] = [];
            expect(reducer(state, todoItemsSorted(Sort.Incmpl1st))).toEqual(state);
        });
    });
});