export interface Task {
    id: number,
    title: string,
    category: string,
    description: string,
    dueDate: string,
    dateCreated: string,
    dateModified: string,
    isDelete: boolean
}

export interface TaskRequest {
    title: string,
    category: string,
    description: string,
    dueDate: string
}
