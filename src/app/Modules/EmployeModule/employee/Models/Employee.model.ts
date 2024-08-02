import { Department } from '../../../DepartmentModule/department/Models/department.model';
import { FormControl, FormArray, FormGroup } from '@angular/forms';

// export interface Employee{
//     id: number,
//     name: string,
//     salary: number,
//     departmentId: number|null,
//     adminId: number|null,
//     role: number
// }

// export interface AddEmployeeResponse{
//     name: string,
//     salary: number,
//     departmentId: number|null,
//     adminId: number|null,
//     role: number
// }

// export interface UpdateEmployeeResponse{
//     name: string,
//     salary: number,
//     departmentId: number|null,
//     adminId: number|null,
//     role: number
// }

// export interface EmployeResponse{
//    success: boolean,
//    message: string,
//    data: Employee[]
// }

// export interface UpdatedEmployeeRequest{
//     success: boolean,
//     message: string,
//     data: number;
// }

// export interface EmployeeForm {
//     name: FormControl<string>;
//     salary: FormControl<number>;
//     departmentName: FormControl<string>;
//     adminName: FormControl<string>;
//     departmentId: FormControl<number|null>;
//     adminId: FormControl<number|null>;
//     role: FormControl<EmployeeRole>;
// } 

// export enum EmployeeRole {
//     Role1 = 1,
//     Role2 = 2,
//     Role3 = 3
//   }


///////////////////Interface for Prince ///////////////////////////////////
export enum EmployeeRole {
    Role0 = 0,
    Role1 = 1,
    Role2 = 2
  }

  export interface Employee {
    createdBy: number// Nullable integer
    updatedBy: number | null; // Nullable integer
    createdOn: string // Nullable date-time string
    updatedOn: string | null; // Nullable date-time string
    id: number | null; // Nullable integer
    name: string | null; // Nullable string
    departmentName: string | null; // Nullable string
    managerName: string | null; // Nullable string
    role: EmployeeRole; // Enum
    salary: number; // Double
    departmentId: number | null; // Nullable integer
    managerId: number | null; // Nullable integer
  }
  
  export interface EmployeeResponse {
    success: boolean;
    status: number; // integer($int32)
    message: string;// Nullable string
    data: Employee[];
  }

  export interface GetEmployeeResponseById {
    success: boolean;
    status: number; // integer($int32)
    message: string;// Nullable string
    data: Employee;
  }
  
  export interface EmployeeForm {
    name: FormControl<string>;
    salary: FormControl<number>;
    departmentName: FormControl<string>;
    managerName: FormControl<string>;
    departmentId: FormControl<number|null>;
    managerId: FormControl<number|null>;
    role: FormControl<EmployeeRole>;
} 

export interface AddEmployeeRequest{
    username: string,
    password: string,
    name: string,
    salary: number,
    departmentId: number|null,
    managerId: number|null,
    role: number
}

export interface UpdatedEmployeeResponse{
    success: boolean,
    status: number,
    message: string,
    data: Employee;
}

export interface UpdateEmployeeRequest{
    username: string,
    password: string,
    name: string,
    salary: number,
    departmentId: number|null,
    managerId: number|null,
    role: number
}

export interface AddEmployeeResponse{
    success: boolean,
    status: number,
    message: string,
    data: number
}

// pagination

export enum SortedOrder {
    ASC = 1,
    DESC = 2,
    OTHER = 3 // Add other values as needed
  }

  export interface DataPage {
    pageIndex: number;
    pagedItemsCount: number;
    orderKey: string | null; // `orderKey` can be a string or null
    sortedOrder: SortedOrder; // `sortedOrder` uses the enum
    search: string | null; // `search` can be a string or null
  }
  