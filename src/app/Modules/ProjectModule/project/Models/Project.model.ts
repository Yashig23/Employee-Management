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
    adminId: number,
    members: Members[]
  }

  export interface Members{
    employeeId: number
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
        members: Employee[]
      }

  }

  export interface Tasks{
    id: number,
    name: string,
    description: string
  }

  export interface Employee{
    employeeId: number,
    employeeName: string
  }