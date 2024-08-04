export interface taskRequest{
    name: string,
    description: string,
    assignedTo: number,
    assignedBy: number,
    projectId: number,
    status: Status
}

export enum Status{
    Pending = 0,
    Active = 1,
    Complete = 2
}

export interface taskResponse{
    success: boolean,
    status: Status,
    message: string,
    data: Data[]
}

export interface Data{
    createdBy: number,
    updatedBy: number,
    createdOn: string,
    updatedOn: string,
    id: number,
    name: string,
    description: string,
    status: Status,
    assignedBy: number,
    assignedTo: number,
    projectId: number,
    assignerName: string,
    assigneeName: string
}

export interface TaskIdPostResquest{
        taskID: number,
        content: string,
        reviewerId: number     
}