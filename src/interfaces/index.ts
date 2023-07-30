import {
    Sort,
} from 'src/static/enums'

export type IToDoItem = {
    id: string,
    text: string,
    createdAt: number, // Unix timestamp
    completed: boolean
}

export type ITodoItemsFilters = {
    searchTerm: string,
    showNewer: boolean,
    showOlder: boolean,
    showCompleted: boolean,
    sortBy: Sort,
}

export type ISortByItem = {
    value: Sort,
    label: string
}