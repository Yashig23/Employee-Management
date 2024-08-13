import { Department } from '../../../DepartmentModule/department/Models/department.model';
import { FormControl, FormArray, FormGroup } from '@angular/forms';

///////////////////Interface for Prince ///////////////////////////////////
export enum EmployeeRole {
    Employee = 0,
    Admin = 1,
    SuperAdmin = 2
  }

  export interface Employee {
    createdBy: number// Nullable integer
    updatedBy: number | null; // Nullable integer
    createdOn: string // Nullable date-time string
    updatedOn: string | null; // Nullable date-time string
    id: number 
    name: string ;
    departmentName: string | null; // Nullable string
    managerName: string | null; // Nullable string
    // email: string;
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
    data: EmployeeIdData;
  }

  export interface GetEmployeeDepartmentById{
    success: boolean;
    status: number,
    message: string,
    data: OnlyEmployeeData[]
  }

  export interface EmployeeIdData{
    createdBy: number// Nullable integer
    // updatedBy: number | null; // Nullable integer
    createdOn: string // Nullable date-time string
    // updatedOn: string | null; // Nullable date-time string
    id: number 
    name: string ;
    departmentName: string | null; // Nullable string
    managerName: string | null; // Nullable string
    email: string;
    address: string;
    imageUrl: string;
    phone: string;
    role: EmployeeRole; // Enum
    salary: number; // Double
    // departmentId: number | null; // Nullable integer
    // managerId: number | null; // Nullable integer
  }
  
  export interface EmployeeForm {
    name: FormControl<string>;
    // lastname: FormControl<string>;
    email: FormControl<string>;
    address: FormControl<string>;
    salary: FormControl<number>;
    phone: FormControl<number>;
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
    phone: number,
    email: string,
    address: string,
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

export interface OnlyEmployeeData{
  id: number,
  name: string,
  departmentName: string | null, 
}

export interface UpdateEmployeeRequest{
  username: string,
  password: string,
  name: string,
  phone: number,
  email: string,
  address: string,
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
    ASC = 0,
    DESC = 1,
    OTHER = 2 
  }

  export interface DataPage {
    pageIndex: number;
    pagedItemsCount: number;
    orderKey: string | null; 
    sortedOrder: SortedOrder; 
    search: string | null; 
  }

  export interface PaginationResponse{
    success: boolean;
    status: number; 
    message: string;
    data: EmployeePagination[];
  }

  export interface EmployeeResponsePagination {
    success: boolean;
    status: number;
    message: string;
    data: EmployeeData;
  }
  
  interface EmployeeData {
    data: Employee[];
    totalPages: number;
    totalItems: number;
  }
  
  interface EmployeePagination {
    id: number;
    name: string;
    departmentName: string | null;
    managerName: string | null;
    role: number;
    salary: number;
    departmentId: number | null;
    managerId: number | null;
    createdBy: number;
    updatedBy: number | null;
    createdOn: string;
    updatedOn: string | null;
  }
  
  export enum ColumnKey {
    // SerialNo = '',
    Name = 'Name',
    CreatedOn = 'CreatedOn',
    DepartmentName = 'DepartmentName',
    Salary = 'Salary',
    Role = 'Role',
    Actions = 'Actions'
  }
  
  export interface DialogService{
    isActive: boolean
  }

  export interface EmployeeAddedList{
    employeeId: number | null
  }

  export interface ProjectListOfEmployee1{
    success: number,
    message: string,
    status: number,
    data: ProjectDetails[]
  }

  export interface ProjectDetails{
    id: number,
    name: string,
    description: string,
    status: number,
    createdBy: string|null,
    createdOn: string
  }

  export interface TasksListOfEmployees{
    success: number,
    message: string,
    status: number,
    data: TaskDetails[]
  }

  export interface TaskDetails{
    id: number,
    name: string,
    description: string | null,
    status: number,
    assignerName: string,
    assigneeName: string,
    createdOn: string
  }

  export interface projectDialogData{
    projectName: string,
    projectId: number
  }