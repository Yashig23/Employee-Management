export interface DataPost{
        pageIndex: number,
        pagedItemsCount: number,
        orderKey: string,
        sortedOrder: number,
        search: string | null
}

export interface PaginationTaskResponse{
     success: boolean,
     status: number,
     message: string|null,
     data: TaskDetails
}

export interface TaskDetails{
    data: Task[],
    totalPages: number,
    totalItems: number
}

export interface Task{
    id: number,
    name: string,
    description: string,
    status: number,
    assignedBy: number,
        assignedTo: number | null,
        projectId: number | null,
        assignerName: string | null,
        assigneeName: string | null,
        createdBy: number,
    updatedBy: number|null,
    createdOn: string,
    updatedOn: string | null
}

// get Tasks

export interface TaskList{
    success: boolean,
    status: number,
    message: string,
    data: Task[] | null
}

// post tasks

export interface TaskPostRequest{
    name: string,
    description: string,
    assignedTo: number|null,
    projectId: number|null,
    status: number
}

export interface TaskPostResponse{
        success: boolean,
        status: number,
        message: string,
        data: number
}

// delete task

export interface deleteTaskResponse{
        success: boolean,
        status: number,
        message: string,
        data: boolean
}

// update task

export interface updateTaskRequest{
    // id: number,
    status: Status | null
}

export enum Status{
    Pending = 0,
    Running = 1,
    Completed = 2
}

export interface updateTaskResponse{
    success: boolean,
  status: number,
  message: string,
  data: Task
}

// getTaskById

export interface taskByIdResponse{
    success: boolean,
    status: number,
    message: string,
    data: Task
}