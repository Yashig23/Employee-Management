export interface DataPost{
        pageIndex: number,
        pagedItemsCount: number,
        orderKey: string | null,
        sortedOrder: number,
        search: string | null
        dateRange: DateRange| null
}

export interface DateRange{
  startDate: string,
  endDate: string
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
    taskType: number,
    parentId: number | null,
    originalEstimateHours: number | null,
    status: number,
    sprintId: number|null
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
  name: string,
  description: string,
  assignedTo: AssignedTo | null,
  taskType: TaskType,
  parentId: number| null,
  projectId: number,
  originalEstimateHours: number|null,
  // remainingEstimateHours: number|null,
  sprintId: number | null,
  status: Status
}

export enum Status{
  Notfinalized = 0,
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
  
  // Define the interface for the data item
  export interface DataItem {
    id: number;
    name: string;
    taskType: TaskType;
    createdOn: string;
    status:StatusType,
    assignedTo: string,
    subItems: DataItem[] | null; 
  }
  
  // Define the main response interface
  export interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
    data: DataItem[];
  }

  export interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    status: StatusType,
    createdOn: string,
    assignedTo: string,
    taskType: TaskType,
    level: number;
  }

  export enum StatusType{
    Notfinalized = 0,
    Running = 1,
    Completed = 2,
  }
  
   export enum TaskType {
    Epic = 0,
    Features = 1,
    Userstory = 2,
    Task = 3,
    Bug = 4
  }

  export enum AssignedTo{
    assigned = 0,
    AssignedTo = 1,
  }

  export interface PaginatedEpicTask{
    pageIndex: number,
    pagedItemsCount: number,
    orderKey: string,
    sortedOrder: number,
    search: string,
    filters: Filters[] | null;
  }

  export interface PaginatedEpicTask2{
    pageIndex: number,
    pagedItemsCount: number,
    orderKey: string,
    sortedOrder: number,
    search: string | null,
    dateRange: DataRange | null,
    types: TaskType[] | null;
    status: Status[] | null;
    assign: boolean | null;
    assignedTo: AssignedTo[] | null;
    sprintId: number| null
    // sprint: Sprint | null;
  }


  export interface DataRange{
    startDate: Date,
    endDate: Date
  }

  export interface Sprint{
    startDate: string ,
    endDate: string | null,
  }
  
  export interface Filters{
    item1: string,
    item2: number
  }

  export interface PaginatedEpicTaskResponse{
    success: boolean,
    status: number,
    message: string,
    data: DataForPagination
  }

  export interface DataForPagination{
   data: paginationDAta,
   totalPages: number,
   totalItems: number
  }

  export interface paginationDAta{
    tasks: TaskData[],
    count: TypeCount
  }

  export interface TypeCount{
    typeCount: {
      epic: number,
      feature: number,
      userStory: number,
      task: number,
      bug: number
    },
    statusCount: {
      active: number,
      pending: number,
      completed: number
    },
    assignCount: {
      assigned: number,
      unAssigned: number
    }
  }

  export interface Data{
     id: number,
    name: string,
    description: string,
    status: Status,
    projectId: number,
    taskType: number,
    assignerName: string,
    assigneeName: string;
    createdOn: string,
  }

  export interface TaskData{
    id: number,
    name: string,
    description: string,
    status: Status,
    projectId: number,
    taskType: number,
    assignedTo: number,
    assignerName: string,
    assigneeName: string;
    createdOn: string,
    sprintId: number,
    originalEstimateHours: number,
    remainingEstimateHours: number
  }

  export interface subtask{
    id: number,
    name: string,
    description: string,
    status: Status,
    projectId: number,
    taskType: number,
    assignerName: string,
    assigneeName: string | null,
    createdOn: string,
    subTask: Data[]
  }

  export interface DataForSubTask{
    success: boolean,
    status: number,
    message: string,
    data: Data[]
  }

  export interface PostReviewRequest{
    taskId: number,
    content: string,
  }

  export interface getTaskReviewResponse{
    success: boolean,
    status: number,
    messgage: string,
    data: TaskReviewData[]
  }

  export interface TaskReviewData{
    id: number,
    content: string,
    reviewedBy: string,
    reviewerAvatarUrl: string,
    cretaedOn : string
  }

  export interface getTaskDetailsById{
    success: boolean,
    status: number,
    messgage: string,
    data: Tasks
  }

  export interface taskData{
    id: number,
      name: string,
      description: string,
      status: number,
      projectId: number,
      taskType: number,
      sprintId: number,
      originalEstimateHours: number | null,
      remainingEstimateHours: number|null;
      assignerName: string,
      assigneeName: string | null,
      assignedTo: number;
      createdOn: string
  }

 export interface Tasks{
  task : taskData;
  reviews: TaskReviewData[];
  subTasks: subTasks[];
  parent: Parent;
 }

 export interface Parent{
  id: number,
  name: string,
  taskType: TaskType
 }

 export interface taskOfSprintResponse{
  success: boolean,
  status: number,
  message: string,
  data: taskData[],
 }

 export interface subTasks{
  id: number,
  name: string,
  taskType: number
 }

 export interface TaskTypeDialogData{
  taskType: number,
  taskId: number,
  projectId: number,
  isEdit: boolean
 }

 export interface ProjectListEmployeeData{
  success: boolean,
  status: number,
  message: string,
  data: DataForEmployee[] | [];
 }

 export interface DataForEmployee{
  id: number,
  name: string,
  departmentName: string | null
 }

 export interface TaskLogResponse{
  success: boolean,
  status: number,
  message: string,
  data: {
    remaining: number,
    logs: DataForTaskLog[];
  };
 }

 export interface DataForTaskLog{
  message: string
 }

 export interface ParentListResponse{
  success: boolean,
  status: number,
  message: string,
  data: DataOfParent[] | null
 }

 export interface DataOfParent{
  id: number,
  taskType: TaskType;
  name: string
 }

 export interface TaskCountResponse{
  total: number,
  typeCount: typeCount,
  statusCount: statusCount,
  assignCount: assignCount
 }

 export interface DataForTaskCount{
  total: number,
  typeCount: typeCount,
  statusCount: statusCount,
  assignCount: assignCount
 }

 export interface typeCount{
  epic: number,
  feature: number,
  userStory: number,
  task: number,
  bug: number
 }

 export interface statusCount{
  active: number,
  pending: number,
  completed: number
 }

 export interface assignCount{
  assigned: number,
  unAssigned: number
 }