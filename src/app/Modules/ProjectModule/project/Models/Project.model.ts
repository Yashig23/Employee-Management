
  // prince interface

  export interface ProjectResponse{
      success: boolean,
      status: number,
      message: string | null,
      data: Project[] | null
  }

  export interface Project{
    createdBy: number,
    updatedBy: number | null,
    createdOn: string,
    updatedOn: string,
    id: number,
    name: string | null,
    description: string | null
  }

  export interface PostProjectResponse{
    success: boolean
    status: number,
    message: string| null,
    data: number
  }

  export interface PostProjectRequest{
    name: string,
    description: string,
    status: Status
    members: Members[]
  }

  export interface Members{
    employeeId: number
  }

  export enum Status{
    Pending = 0,
    Active = 1,
    Complete= 2
  }

  export interface ProjectByIdResponse{
      success: boolean,
      status: number,
      message: string,
      data: projectData;
  }

  export interface projectData{
    name: string,
    createdBy: number,
    updatedBy: number,
    createdOn: string,
    updatedOn: string,
    status: number,
    id: number,
    description: string,
    pendingTask: number | null,
    totalTask: number | null,
    tasks: Tasks[] | null,
    members: EmployeeForProjects[]
  }

  export interface Tasks{
    id: number,
    name: string,
    description: string,
    status: number
  }

  export interface EmployeeForProjects{
    employeeId: number,
    employeeName: string
  }

  export interface DeleteProjectResponse{
      success: boolean,
      status: number,
      message: string,
      data: boolean
  }

  export interface DataPage {
    pageIndex: number;
    pagedItemsCount: number;
    orderKey: string | null; 
    sortedOrder: SortedOrder; 
    search: string | null; 
    dateRange: DateRange | null;
  }

  export interface DateRange{
    startDate: string,
    endDate: string
  }

  
export enum SortedOrder {
  ASC = 0,
  DESC = 1,
  OTHER = 2 
}

export interface PaginationResponse{
  success: boolean;
  status: number; 
  message: string;
  data: ProjectsPagination[];
}

export interface ProjectResponsePagination {
  success: boolean;
  status: number;
  message: string;
  data: ProjectData;
}

interface ProjectData {
  data: Project[] | null;
  totalPages: number;
  totalItems: number;
}

export interface ProjectsPagination {
  id: number;
  name: string;
  departmentName: string | null;
  status: number;
  managerName: string | null;
  createdBy: number;
  updatedBy: number | null;
  createdOn: string;
  updatedOn: string | null;
}

export interface ProjectByEmployeeId{
  success: boolean;
  status: number;
  message: string;
  data: ProjectListOfEmployee[] | null;
}

export interface ProjectListOfEmployee{
  id: number;
  name: string;
  description: string;
  status: number;
  assignerName: string;
  assigneeName: string;
  createdOn: string;
}

export interface employeeUpdate{
  employeeId: number
}

export interface updateProjectByIdRequest{
  name: string,
  description: string,
  status: number,
  members: employeeUpdate[] | null
}

export interface updateProjectByIdResponse{
  success: boolean,
  status: number,
  message: string,
  data: number
}

export interface EmployeeForProject {
  employeeId: number | null;
  employeeName: string | null;
}

export interface PostSprintRequest{
  name: string,
  startDate: string,
  endDate: string,
  projectId: number
}

export interface SprintData{
  name: string,
  startDate: string,
  endDate: string
}

export interface SprintData2{
  id: number,
  name: string,
  startDate: string,
  endDate: string
}

export interface GetSprintById{
  success: true,
  status: number,
  message: string,
  data: SprintData
}

export interface getSprintsList{
  success: true,
  status: number,
  message: string,
  data: SprintData[]
}

export interface getSprintsListByProjectId{
  success: true,
  status: number,
  message: string,
  data: SprintData2[]
}
