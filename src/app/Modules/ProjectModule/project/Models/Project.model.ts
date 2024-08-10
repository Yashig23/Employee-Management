// project-employee.model.ts
// export interface ProjectEmployee {
//     id: number;
//     name: string;
//   }
  
  // project-data.model.ts
  // export interface ProjectData {
  //   name: string;
  //   description: string;
  //   createdBy: string;
  //   createdOn: Date; 
  //   status: number;
  //   projectEmployee: ProjectEmployee[];
  // }
  
//   export interface ProjectResponse {
//     success: boolean;
//     message: string;
//     data: ProjectData;
//   }


// export interface ProjectRequest {
//     name: string;
//     description: string;
//     createdBy: number; 
//     status: number;    
//     members: number[];
//   }
  
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
      data: {
        createdBy: number,
        updatedBy: number,
        createdOn: string,
        updatedOn: string,
        id: number,
        name: string,
        description: string
        tasks: Tasks[],
        members: EmployeeForProjects[]
      }

  }

  export interface Tasks{
    id: number,
    name: string,
    description: string
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
  data: Project[];
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
  data: ProjectListOfEmployee[];
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